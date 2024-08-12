const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  booker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  name: String,
  mobile: String,
  checkIn: String,
  checkOut: String,
  totalprice: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
