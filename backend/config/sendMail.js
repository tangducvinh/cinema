const nodemailer = require("nodemailer");

const sendMail = async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  let info = await transporter.sendMail({
    from: "'cinema' <no-reply@gmail.com>",
    to: email,
    subject: subject,
    html: html,
  });
};

module.exports = sendMail;
