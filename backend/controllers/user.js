const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const crypto = require("crypto");
const { generatePassword, hashPassword } = require("../ultis/password");
const sendMail = require("../config/sendMail");
const { skipMiddlewareFunction } = require("mongoose");
const { constants } = require("fs/promises");

// dang ky tai khoan
const register = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(500).json("Missing input");
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(200).json({
        success: false,
        mes: "Email đã tồn tại",
      });
    }

    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      return res.status(200).json({
        succss: false,
        mes: "Số điện thoại đã tồn tại",
      });
    }

    const hashed = bcrypt.hashSync(password, 10);

    const response = await User.create({
      email,
      password: hashed,
      name,
      phone,
    });

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
      mes: response
        ? "Đăng kí tài khoản thành công"
        : "Đăng kí tài khoản thất bại",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

// dang nhap
const login = async (req, res) => {
  try {
    // account: email || phone
    const { account, password } = req.body;

    const response = await User.findOne({
      $or: [{ email: account }, { phone: account }],
    });

    if (!response) {
      return res.status(404).json("Account didn't exist");
    }

    const validPassword = await bcrypt.compare(password, response.password);

    if (!validPassword) {
      return res.status(404).json("Wrong password");
    } else {
      // tao accessToken
      const accessToken = generateAccessToken(response._id, response.role);
      // tao refreshToken
      const refreshToken = generateRefreshToken(response._id, response.role);
      // gan refreshToken vao cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      const { password, ...userData } = response.toObject();
      userData.accessToken = accessToken;

      return res.status(200).json({
        success: true,
        data: response ? userData : "no data",
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }
    jwt.verify(refreshToken, "dfdfdfdf", (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(500).json(e);
      }

      const newAccessToken = generateAccessToken(decode._id, decode.role);
      const newRefreshToken = generateRefreshToken(decode._id, decode.role);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
      });

      return res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      mes: "Logout thành công",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.user;

    console.log({ _id });

    const response = await User.findOne({ _id });

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(200).json(e);
  }
};

// yeu cau thay doi mat khau
const sendNewPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(500).json("Missing input");
    }

    const user = User.findOne({ email });

    if (!user) {
      return res.status(500).json("Email didn't exists");
    }

    let newPassword = await generatePassword();
    console.log({ newPassword });
    const hashed = await hashPassword(newPassword);
    console.log(hashed);

    await user.findOneAndUpdate({ email }, { password: hashed }, { new: true });

    const html = `Yêu cầu lấy lại mật khẩu <br> Mật khẩu mới của bạn là: <strong>${newPassword}</strong>`;
    const data = {
      email,
      html,
      subject: "Mật khẩu mới",
    };
    await sendMail(data);

    return res.status(200).json({
      success: true,
      mes: "Vui lòng chech email để lấy mật khẩu mới",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res.status(500).json("missing input");
    }

    const user = await User.findById({ _id });

    const validPassword = await bcrypt.compare(password, user.password);

    console.log(validPassword);

    if (!validPassword) {
      return res.status(500).json("password wrong");
    } else {
      const hashed = await hashPassword(newPassword);
      const response = await User.findByIdAndUpdate(
        { _id },
        { password: hashed },
        { new: true }
      );

      return res.status(200).json({
        success: response ? true : false,
        mes: response
          ? "Bạn đã thay đổi mật khẩu thành công"
          : "Thực hiện thay đổi mật khẩu thất bại",
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

// lay danh sach nguoi dung
const getAllUser = async (req, res) => {
  try {
    const { title, role } = req.query;

    const query = {};
    if (title) {
      if (Number(title)) {
        query.phone = { $regex: title, $options: "i" };
      } else {
        query.email = { $regex: title, $options: "i" };
      }
    }

    if (role) {
      query.role = role;
    }

    let queryCommand = User.find(query);

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 15;
    const skip = (page - 1) * limit;

    queryCommand.skip(skip).limit(limit);

    queryCommand
      .exec()
      .then(async (response) => {
        const counts = await User.find(query).countDocuments();

        return res.status(200).json({
          success: response ? true : false,
          data: response ? response : "no data",
          counts,
        });
      })
      .catch((err) => res.status(500).json(e));
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, role, uid } = req.body;

    const response = await User.findByIdAndUpdate(
      { _id: uid },
      { name, email, phone, role: Number(role) },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      mes: response
        ? "Cập nhật thông tin thành công"
        : "Cập nhật thông tin thất bại",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

// xoa tai khoan
const deleteUser = async (req, res) => {
  try {
    // uid: userId
    const { uid } = req.params;

    const response = await User.findByIdAndDelete({ _id: uid });

    return res.status(200).json({
      success: response ? true : false,
      mes: response
        ? "Xoá người tài khoản thành công"
        : "Thực hiện xoá tài khoản thất bại",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  register,
  deleteUser,
  login,
  getAllUser,
  refreshToken,
  logout,
  getUser,
  sendNewPassword,
  changePassword,
  updateUser,
};
