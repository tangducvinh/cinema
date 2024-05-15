const { ObjectId } = require("mongodb");
const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {

    const {
      movieID,
      total_pay,
      seats,
      status,
      userId,
      method_pay,
      showId,
      roomId,
    } = req.body;

    let codeNumber

    do {
      console.log('hello')
      codeNumber = Math.round(Math.random() * 10000000)
      var order = Order.findOne({orderNumber: codeNumber})
    } while(order.length > 0)

    console.log(codeNumber)

    const response = await Order.create({...req.body, orderNumber: codeNumber});
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : "Dat ve that bai",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const detailOrder = async (req, res) => {
  try {
    // sid: id cua xuat chieu (show)
    const { oid } = req.params;
    const response = await Order.findOne({ _id: oid }).populate([
      {
        path: "movieId",
        select: "poster_path original_title runtime tagline",
      },
      {
        path: "userId",
      },
      {
        path: "showId",
      },
      {
        path: "roomId",
        select: "name",
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

const allOrder = async (req, res) => {
  try {
    // sid: id cua xuat chieu (show)

    const { day, title } = req.query

    const minTime = new Date(`${day} 00:00:00`);
    const maxTime = new Date(`${day} 23:59:00`);

    const query = {};
    console.log(title)
    if (title) {
      query.orderNumber = title
    }

    const response = await Order.find({...query, createdAt: { $gte: minTime, $lt: maxTime }}).populate([
      {
        path: "movieId",
        select: "original_title",
      },
      {
        path: "userId",
        select: "name email phone",
      },
      {
        path: "showId",
        select: "begin_time",
      },
      {
        path: "roomId",
        select: "name",
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

const listOrderUser = async (req, res) => {
  try {
    // sid: id cua xuat chieu (show)
    const { uid } = req.params;
    const newId = new ObjectId(uid);
    const response = await Order.find({
      userId: newId,
    }).populate([
      {
        path: "movieId",
        select: "original_title",
      },
      {
        path: "userId",
        select: "name email",
      },
      {
        path: "showId",
        select: "begin_time",
      },
      {
        path: "roomId",
        select: "name",
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

module.exports = {
  createOrder,
  detailOrder,
  allOrder,
  listOrderUser,
};
