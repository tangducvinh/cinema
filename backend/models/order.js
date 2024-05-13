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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
