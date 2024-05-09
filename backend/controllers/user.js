const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const crypto = require("crypto");
const { generatePassword, hashPassword } = require("../ultis/password");
const sendMail = require("../config/sendMail");

// dang ky tai khoan
const register = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name || !phone)
      return res.status(500).json("Missing input");

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
      mes: response ? "Register is successfully" : "Resgister is faided",
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
      const refreshToken = generateRefreshToken(response._id);
      // gan refreshToken vao cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      const { password, role, ...userData } = response.toObject();
      return res.status(200).json({
        success: true,
        data: response ? userData : "no data",
        accessToken,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookie.refreshToken;
  if (!refreshToken) {
    return res.status(401).json("You are not authenticated");
  }
  jwt.verify(refreshToken, process.env.SECRET_KEY_RF, (err, decode) => {
    if (err) {
      console.log(err);
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
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout successfully");
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
    const { title } = req.query

    const query = {}
    if (title) {
      if (title.slice(0, 1) === '0') {
        query.phone = {$regex: title, $options: 'i'}
      } else {
        query.email = {$regex: title, $options: 'i'}
      }
    }

    const response = await User.find(query);

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateUser = async(req, res) => {
  try {
    console.log(req.body)
    const { name, email, phone, role, uid } = req.body

    const response = await User.findByIdAndUpdate({_id: uid}, {name, email, phone, role: Number(role)}, {new: true})

    return res.status(200).json({
      success: response ? true : false,
      mes: response ? 'Cập nhật thông tin thành công' : 'Cập nhật thông tin thất bại'
    })

  } catch(e) {
    return res.status(500).json(e)
  }
}

// xoa tai khoan
const deleteUser = async (req, res) => {
  try {
    // uid: userId
    const { uid } = req.params;

    const response = await User.findByIdAndDelete({ _id: uid });

    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Xoá người tài khoản thành công" : "Thực hiện xoá tài khoản thất bại",
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
