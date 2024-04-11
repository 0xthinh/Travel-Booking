const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true },
  photos: [{ type: String, required: true }],
  desc: { type: String, required: true },
  rating: { type: Number, required: false },
  cheapestPrice: { type: Number, required: true },
  featured: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = mongoose.model("Hotel", hotelSchema);
