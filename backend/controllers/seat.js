const Seat = require("../models/seat");

// tao ghe
const createSeat = async (req, res) => {
  try {
    console.log(req.body)
    const { idRoom, row, number, status, name } = req.query 

    const checkDup = await Seat.find({idRoom, row, number})

    console.log(checkDup)

    if (checkDup.length === 0) {
      const response = await Seat.create(req.body);

      console.log(req.body)

      return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "no data",
        mes: response ? "Thanh cong" : "That bai",
      });
    } else {
      res.status(200).json({
        success: false,
        mes: 'Ghế đã tồn tại'
      })
    }
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

const updateSeat = async(req, res) => {
  try {
    const { id, status, name } = req.body

    const response = await Seat.findByIdAndUpdate({_id: id}, {status: status, name: name}, {new: true})

    console.log(response)

    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : 'no data',
      mes: response ? 'Cập nhật trạng thái ghế thành công' : 'Cập nhật trạng thái ghế thất bại'
    })

  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports = {
  createSeat,
  getListSeat,
  updateSeat
};
