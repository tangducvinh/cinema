const Seat = require("../models/seat");

// tao ghe
const createSeat = async (req, res) => {
  try {
    const { idRoom, row, number, status, name } = req.body 

    console.log(req.body)


    const checkDup = await Seat.findOne({idRoom, row, number})

    if (!checkDup) {
      const response = await Seat.create(req.body);

      return res.status(200).json({
        success: response ? true : false,
        data: response ? response : "no data",
        mes: response ? "Tạo ghế thành công" : "Tạo ghế thất bại",
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

const autoCreateSeat = async(req, res) => {
  try {
    
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        const listName = ['x', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
        const name = `${listName[i]}${j}`
        await Seat.create({name, idRoom: '6657df5e0e14634478dcf6d4', row: i, number: j, status: 'activity'})
      }
    }

    return



  } catch(e) {
    return res.status(200).json(e)
  }
}

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
  updateSeat,
  autoCreateSeat
};
