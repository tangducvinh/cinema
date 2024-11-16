const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { dbConnect } = require("./config/dbconnect");
const initRoutes = require("./routers");
const sendMail = require("./config/sendMail");

const app = express();

// app.use(cors())

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);
// const oke = async () => {
//   await sendMail("badagor999@gmail.com", `<h1>oke123</h1>`, "oke123");
// };
// oke();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on the port: " + port);
});
