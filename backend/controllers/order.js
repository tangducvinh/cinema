const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const { movieID, total_pay, seats, status, userId, method_pay, showId } =
      req.body;

    const response = await Order.create(req.body);
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
    const response = await Order.findOne({ _id: oid });

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
};
