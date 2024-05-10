const Seat = require("../models/seat");

// tao ghe
const createSeat = async (req, res) => {
  try {
    const response = await Seat.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
      mes: response ? "Thanh cong" : "That bai",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

// lay danh sach ghe tai phong nao do
const getListSeat = async (req, res) => {
  try {
    const { idRoom } = req.query;

    if (!idRoom) return res.status(500).json("missing input");

    const response = await Seat.find({ idRoom }).sort({ row: 1, number: 1 });
    const counts = await Seat.find({ idRoom, status: 'activity' }).sort({ row: 1, number: 1 }).countDocuments()

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "no data",
      counts,
      mes: response ? "Thanh cong" : "That bai",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  createSeat,
  getListSeat,
};
