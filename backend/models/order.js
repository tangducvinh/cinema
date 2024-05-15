const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
    total_pay: {
      type: Number,
    },
    seats: {
      type: Array,
    },
    orderNumber: {
      type: Number,
      unique: true,
    },
    status: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    method_pay: { type: String },
    showId: {
      type: mongoose.Types.ObjectId,
      ref: "Show",
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
