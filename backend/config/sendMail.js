const nodemailer = require("nodemailer");

const sendMail = async (email, html, subject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: "ducvinh100503@gmail.com",
      pass: "ddfp gmlb sguh nxhw",
    },
    tls: { rejectUnauthorized: false },
  });

  let info = await transporter.sendMail({
    from: "'cinema' <no-reply@gmail.com>",
    to: email,
    subject: subject,
    html: html,
  });
  console.log("Sendmail oke");
};

module.exports = sendMail;
