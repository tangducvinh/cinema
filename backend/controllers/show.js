const Show = require("../models/show");

// tao xuat chieu
const createShow = async (req, res) => {
  try {
    console.log("h 1");
    const { begin_time, roomId, end_time, movieId, day } = req.body;

    const check1 = await Show.find({
      roomId,
      begin_time: { $lte: new Date(begin_time) },
      end_time: { $gte: new Date(begin_time) },
    });
    const check2 = await Show.find({
      roomId,
      begin_time: { $lte: new Date(end_time) },
      end_time: { $gte: new Date(end_time) },
    });
    const check3 = await Show.find({
      roomId,
      begin_time: { $gte: new Date(begin_time) },
      end_time: { $lte: new Date(end_time) },
    });

    console.log("h 2");

    console.log({check1, check2, check3})

    if (check1.length > 0 || check2.length > 0 || check3.length > 0)
      return res.status(200).json({
        success: false,
        mes: "Bị trùng giờ chiếu",
      });

    const response = await Show.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
      mes: response ? "Đã tạo xuất chiếu thành công" : "Đã có lỗi xảy ra",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

// lay danh sach xuat chieu
const getListShow = async (req, res) => {
  try {
    const { movieId, day } = req.query;
    const minTime = new Date(`${day} 00:00:00`);
    const maxTime = new Date(`${day} 23:59:00`);

    const response = await Show.find({
      movieId,
      begin_time: { $gte: minTime, $lt: maxTime },
    }).sort({ begin_time: 1 });

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllShow = async (req, res) => {
  try {
    const { day, title } = req.query;
    const minTime = new Date(`${day} 00:00:00`);
    const maxTime = new Date(`${day} 23:59:00`);

    let query = {};

    if (title) {
      console.log("hello 2");
      query = {
        ...query,
        "movieId.$original_title": { $regex: title, $options: "i" },
      };
    }

    // movieId

    console.log(query);

    const response = await Show.find({
      ...query,
      begin_time: { $gte: minTime, $lt: maxTime },
    })
      .sort({ begin_time: 1 })
      .populate([
        {
          path: "movieId",
          select: "original_title poster_path runtime id _id",
        },
        {
          path: "roomId",
          select: "name _id",
        },
      ]);

    // console.log(response)

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

// lay chi tiet xuat chieu
const getShowDetail = async (req, res) => {
  try {
    // sid: id cua xuat chieu (show)
    const { sid } = req.params;

    const response = await Show.findOne({ _id: sid }).populate([
      {
        path: "movieId",
        select: "poster_path original_title runtime tagline",
      },
      {
        path: "roomId",
      },
    ]);

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

// update infor show
const updateShow = async (req, res) => {
  try {
    const { sid, begin_time, end_time, movieId, price, roomId } = req.body;
 
    const check1 = await Show.findOne({
      roomId,
      begin_time: { $lte: new Date(begin_time) },
      end_time: { $gte: new Date(begin_time) },
    });
    const check2 = await Show.findOne({
      roomId,
      begin_time: { $lte: new Date(end_time) },
      end_time: { $gte: new Date(end_time) },
    });
    const check3 = await Show.findOne({
      roomId,
      begin_time: { $gte: new Date(begin_time) },
      end_time: { $lte: new Date(end_time) },
    });

    console.log({sid, check1})

    if ((check1 && sid !== check1?._id.toString()) || (check2 && sid !== check2?._id.toString()) || (check3 && sid !== check3?._id.toString())) {
      return res.status(200).json({
        success: false,
        mes: "Bị trùng giờ chiếu",
      });
    }

    const response = await Show.findByIdAndUpdate(
      { _id: sid },
      { begin_time, end_time, movieId, price, roomId },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      mes: response
        ? "Thực hiện cập nhật thông tin thành công"
        : "Thực hiện cập nhật thất bại",
    });
  } catch (e) {
    console.log(e)
    // return res.status(500).json(e);
  }
};

// them ghe da ban vao trong danh sach ghe da ban
const updateBlockSeat = async (req, res) => {
  try {
    // sid: id cua xuat chieu showId
    // seatId: id cua ghe
    // name: ten cua ghe
    // userId: user id da mua
    const { sid, seats, name, userId } = req.body;
    const newData = await seats.map((seat) => ({
      seatId: seat._id,
      name: seat.name,
      status: "sold",
    }));
    console.log("sid ", sid);
    console.log("data ", newData);

    const response = await Show.findByIdAndUpdate(
      { _id: sid },
      {
        $push: {
          block_seats: { $each: newData },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteShow = async (req, res) => {
  try {
    const { sid } = req.params;

    const response = await Show.findByIdAndDelete({ _id: sid });

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
      mes: response ? "Thực hiện xoá thành công" : "Thực hiện xoá thất bại",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  createShow,
  getListShow,
  getShowDetail,
  updateBlockSeat,
  getAllShow,
  deleteShow,
  updateShow,
};
