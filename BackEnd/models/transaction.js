const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  hotel: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
  room: { type: Array, default: [], required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: {
    type: String,
    enum: ["Credit Card", "Cash"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Booked", "Checkin", "Checkout"],
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
