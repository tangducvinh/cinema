const { VNPay, ignoreLogger } = require("vnpay");

const vnpay = new VNPay({
  tmnCode: "QU6Q42VS",
  secureSecret: "74LOSQHEKAFBRJXHC335KL020CU0OINC",
  vnpayHost: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
  // hashAlgorithm: hasdcode, // tùy chọn

  /**
   * Sử dụng enableLog để bật/tắt logger
   * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
   */
  enableLog: true, // optional

  loggerFn: ignoreLogger,
});

module.exports = vnpay;
