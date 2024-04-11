const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

// Get all hotels
exports.getHotelList = (req, res, next) => {
  Hotel.find().then((hotels) => {
    // console.log(hotels);
    res.json(hotels);
  });
};

// Get hotels theo yêu cầu
exports.getSuitableHotels = (req, res, next) => {
  console.log("request came");
  const requirements = req.body;
  Hotel.find()
    .populate("rooms")
    .then((hotels) => {
      // Xét theo địa điểm
      const matchCity = hotels.filter((item) => {
        return item.city
          .toLowerCase()
          .includes(requirements.city.toLowerCase());
      });
      // console.log(matchCity);
      if (matchCity.length == 0) {
        return res
          .status(404)
          .json({ success: false, message: "No matched hotels" });
      }

      // Xét theo số phòng
      // Tìm xem hotel đó có tổng cộng bao nhiêu phòng

      const maxRoomCount = matchCity.map((hotel) => {
        let totalRoom;

        totalRoom = hotel.rooms.reduce(
          (acc, cur) => acc + cur.roomNumbers.length,
          0
        );

        return { ...hotel._doc, totalRoom: totalRoom };
      });

      const matchRoom = maxRoomCount.filter((hotel) => {
        return hotel.totalRoom >= requirements.roomCount;
      });

      if (matchRoom.length == 0) {
        return res
          .status(404)
          .json({ success: false, message: "No matched hotels" });
      }
      return res.status(404).json({ success: true, message: matchRoom });
    });
};

// Store the booking transaction
exports.bookHotel = (req, res, next) => {
  const transaction = req.body;
  const newTransaction = new Transaction(transaction);
  newTransaction.save().then((tx) => {
    return res.json("Success");
  });
};

// Get tx according to userId
exports.getTransactions = (req, res, next) => {
  console.log(req.body);
  const { userId } = req.body;
  const userObjectId = new mongoose.Types.ObjectId(userId);

  Transaction.find({ user: userObjectId })
    .populate({
      path: "hotel", // Populate the 'hotel' field in Transaction
      populate: {
        path: "rooms", // Populate the 'room' field in Hotel
      },
    })
    .then((txs) => {
      if (!txs || txs.length === 0) {
        return res.status(404).json({ message: "No transactions found" });
      }
      console.log(txs);
      return res.status(200).json(txs);
    });
};
