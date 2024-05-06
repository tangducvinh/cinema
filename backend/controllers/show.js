const Show = require("../models/show");

// tao xuat chieu
const createShow = async (req, res) => {
  try {
    const { begin_time, roomId, end_time, movieId } = req.body;

    const check = await Show.find({
      roomId,
      begin_time: { $lte: new Date(begin_time) },
      end_time: { $gte: new Date(begin_time) },
    });
    console.log(check.length);
    if (check.length > 0) return res.status(500).json("Bi trung gio chieu");

    const response = await Show.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
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
// lay chi tiet xuat chieu
const getShowDetail = async (req, res) => {
  try {
    // sid: id cua xuat chieu (show)
    const { sid } = req.params;
    console.log(sid);

    const response = await Show.find({ _id: sid }).populate([
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

// them ghe da ban vao trong danh sach ghe da ban
const updateBlockSeat = async (req, res) => {
  try {
    // sid: id cua xuat chieu showId
    // seatId: id cua ghe
    // name: ten cua ghe
    // userId: user id da mua
    const { sid, seatId, name, userId } = req.body;

    const response = await Show.findByIdAndUpdate(
      { _id: sid },
      { $push: { block_seats: { seatId, name, status: "sold" } } },
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

module.exports = {
  createShow,
  getListShow,
  getShowDetail,
  updateBlockSeat,
};
