const { ObjectId, MongoCryptCreateDataKeyError } = require("mongodb");
const Order = require("../models/order");
const Movie = require("../models/movie");

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

    let codeNumber;

    do {
      console.log("hello");
      codeNumber = Math.round(Math.random() * 10000000);
      var order = await Order.findOne({ orderNumber: codeNumber });
    } while (order !== null);

    const response = await Order.create({
      ...req.body,
      orderNumber: codeNumber,
    });
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

    const { day, title } = req.query;

    const minTime = new Date(`${day} 00:00:00`);
    const maxTime = new Date(`${day} 23:59:00`);

    const query = {};
    if (title) {
      query.orderNumber = title;
    }

    const response = Order.find({
      ...query,
      createdAt: { $gte: minTime, $lt: maxTime },
    }).populate([
      {
        path: "movieId",
        select: "original_title poster_path",
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

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 15;
    const skip = (page - 1) * limit;

    response.skip(skip).limit(limit);

    response
      .exec()
      .then(async (result) => {
        const counts = await Order.find({
          ...query,
          createdAt: { $gte: minTime, $lt: maxTime },
        }).countDocuments();

        return res.status(200).json({
          success: result ? true : false,
          data: result ? result : "no data",
          counts: counts,
        });
      })
      .catch((e) => res.status(500).json(e));
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
    })
      .limit(10)
      .sort({ createdAt: -1 })
      .populate([
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

const getDataChart = async (req, res) => {
  try {
    const { type } = req.params;
    const { day } = req.query;

    const result = [];
    let totalToday = 0;
    const dataMovie = [];

    if (type === "day") {
      for (let i = 0; i < 15; i++) {
        let currentDay = new Date(
          new Date(day).setDate(new Date(day).getDate() - i)
        );
        const min = new Date(
          `${currentDay.getFullYear()}-${
            currentDay.getMonth() + 1
          }-${currentDay.getDate()} 00:00:00`
        );
        const max = new Date(
          `${currentDay.getFullYear()}-${
            currentDay.getMonth() + 1
          }-${currentDay.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({ createdAt: { $gte: min, $lte: max } })
        ).reduce((accumular, current) => accumular + current.total_pay, 0);

        result.unshift({
          day: `${currentDay.getDate()}-${currentDay.getMonth() + 1}`,
          value: response,
        });

        if (i === 0) totalToday = response;
      }

      const listMovie = (
        await Movie.find({ $or: [{ status: "showing" }, { status: "showed" }] })
      ).map((item) => item._id.toString());

      for (let movieId of listMovie) {
        const currentDay = new Date(day);

        const min = new Date(
          `${currentDay.getFullYear()}-${
            currentDay.getMonth() + 1
          }-${currentDay.getDate()} 00:00:00`
        );
        const max = new Date(
          `${currentDay.getFullYear()}-${
            currentDay.getMonth() + 1
          }-${currentDay.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({
            $and: [{ movieId }, { createdAt: { $gte: min, $lte: max } }],
          })
        ).reduce((acc, current) => acc + current.total_pay, 0);

        const inforMovie = await Movie.findOne({ _id: movieId }).select(
          "original_title poster_path release_date status id"
        );

        dataMovie.push({ inforMovie, total: response });
      }

      dataMovie.sort((a, b) => {
        return b.total - a.total;
      });
    } else if (type === "month") {
      for (let i = 0; i < 12; i++) {
        let currentMonth = new Date(
          new Date(day).setMonth(new Date(day).getMonth() - i)
        );

        const min = new Date(
          `${currentMonth.getFullYear()}-${
            currentMonth.getMonth() + 1
          }-${1} 00:00:00`
        );
        // const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
        const max = new Date(
          `${currentMonth.getFullYear()}-${
            currentMonth.getMonth() + 1
          }-${currentMonth.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({ createdAt: { $gte: min, $lte: max } })
        ).reduce((accumular, current) => accumular + current.total_pay, 0);

        result.unshift({
          day: `${currentMonth.getMonth() + 1}-${currentMonth.getFullYear()}`,
          value: response,
        });

        if (i === 0) totalToday = response;
      }

      const listMovie = (
        await Movie.find({ $or: [{ status: "showing" }, { status: "showed" }] })
      ).map((item) => item._id.toString());

      for (let movieId of listMovie) {
        let currentMonth = new Date(day);
        // const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

        const min = new Date(
          `${currentMonth.getFullYear()}-${
            currentMonth.getMonth() + 1
          }-1 00:00:00`
        );
        const max = new Date(
          `${currentMonth.getFullYear()}-${
            currentMonth.getMonth() + 1
          }-${currentMonth.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({
            $and: [{ movieId }, { createdAt: { $gte: min, $lte: max } }],
          })
        ).reduce((acc, current) => acc + current.total_pay, 0);

        const inforMovie = await Movie.findOne({ _id: movieId }).select(
          "original_title poster_path release_date status id"
        );

        dataMovie.push({ inforMovie, total: response });
      }

      dataMovie.sort((a, b) => {
        return b.total - a.total;
      });
    } else {
      for (let i = 0; i < 10; i++) {
        let now = new Date(new Date(day));

        const min = new Date(`${now.getFullYear() - i}-1-1 00:00:00`);
        const max = new Date(
          `${now.getFullYear() - i}-${
            now.getMonth() + 1
          }-${now.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({ createdAt: { $gte: min, $lte: max } })
        ).reduce((accumular, current) => accumular + current.total_pay, 0);

        result.unshift({ day: `${now.getFullYear() - i}`, value: response });

        if (i === 0) totalToday = response;
      }

      const listMovie = (
        await Movie.find({ $or: [{ status: "showing" }, { status: "showed" }] })
      ).map((item) => item._id.toString());

      for (let movieId of listMovie) {
        let now = new Date(day);

        const min = new Date(`${now.getFullYear()}-1-1 00:00:00`);
        const max = new Date(
          `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 23:59:59`
        );

        const response = (
          await Order.find({
            $and: [{ movieId }, { createdAt: { $gte: min, $lte: max } }],
          })
        ).reduce((acc, current) => acc + current.total_pay, 0);

        const inforMovie = await Movie.findOne({ _id: movieId }).select(
          "original_title poster_path release_date status id"
        );

        dataMovie.push({ inforMovie, total: response });
      }

      dataMovie.sort((a, b) => {
        return b.total - a.total;
      });
    }

    return res.status(200).json({
      success: result.length > 0 ? true : false,
      data: result,
      totalToday,
      dataMovie,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  createOrder,
  detailOrder,
  allOrder,
  listOrderUser,
  getDataChart,
};
