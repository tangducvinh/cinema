const vnpay = require("../config/paymentVNP");
const sendMail = require("../config/sendMail");

const urlClient = "https://ciiinema.vercel.app";
const urlServer = "https://ciinema.vercel.app";
// const urlClient = "http://localhost:3000";
// const urlServer = "http://localhost:5000";
const paymentVPN = async (req, res) => {
  const { amount, email, sid } = req.body;

  const date = new Date();
  const orderId = date.getTime().toString();

  const returnUrl = `${urlServer}/api/payment/verify-vnp?email=${email}&sid=${sid}`;

  // Tạo URL thanh toán
  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: amount,
    vnp_IpAddr:
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toán đặt vé",
    vnp_OrderType: "this is email",
    vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
  });

  return res.status(200).json({
    success: true,
    data: { paymentUrl },
  });
};

const verifyVnp = async (req, res) => {
  const { vnp_TxnRef, email, sid } = req.query;

  let verify;
  try {
    verify = vnpay.verifyReturnUrl(req.query);
    console.log("123 123 ", verify);

    if (!verify.isSuccess) {
      return res.redirect(`${urlClient}/booking/${sid}?status=failed`);
    }
    return res.redirect(`${urlClient}/booking/${sid}?status=success`);
  } catch (e) {
    console.log(e);
    return res.redirect(`${urlClient}/booking-failed`);
  }

  return;
};
module.exports = {
  paymentVPN,
  verifyVnp,
};
