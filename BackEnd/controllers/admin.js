const hotel = require("../models/hotel");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

// Load Dashboard
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .populate("user")
    .populate("hotel")
    .then((txs) => {
      if (txs.length > 8) {
        const response = txs.splice(0, 8);
        return res.json(response);
      }
      return res.json(txs);
    });
};

// Load Lists Menu
exports.getListData = (req, res, next) => {
  const param = req.params.list;
  console.log(param);
  // List Hotel
  if (param === "hotel") {
    Hotel.find()
      .populate("rooms")
      .then((hotels) => {
        return res.json(hotels);
      });
  }
  // List Room
  if (param === "room") {
    Room.find().then((rooms) => {
      return res.json(rooms);
    });
  }

  // List Transaction
  if (param === "transaction") {
    Transaction.find()
      .populate("user")
      .populate("hotel")
      .then((txs) => {
        return res.json(txs);
      });
  }
};

// Delete Hotel
exports.deleteHotel = (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  // Check xem có transaction nào active liên quan đến hotel này ko
  Transaction.find()
    .populate("hotel")
    .then((txs) => {
      const toDeleteHotel = txs.find((item) =>
        item.hotel.equals(new mongoose.Types.ObjectId(id))
      );
      if (toDeleteHotel) {
        return res
          .status(401)
          .json("This hotel is being booked. Can NOT delete");
      }

      Hotel.findByIdAndDelete(id)
        .then(() => {
          return Hotel.find();
        })
        .then((hotelArr) => {
          return res.status(200).json(hotelArr);
        });
    });
};

// Delete Room
exports.deleteRoom = (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  // Check xem có transaction nào active liên quan đến room này ko

  Transaction.find()
    .populate({
      path: "hotel", // Populate the 'hotel' field in Transaction
      populate: {
        path: "rooms", // Populate the 'room' field in Hotel
      },
    })
    .then((txs) => {
      console.log(txs);
      // const toDeleteHotel = txs.find((item) =>
      //   item.hotel.equals(new mongoose.Types.ObjectId(id))
      // );
      // if (toDeleteHotel) {
      //   return res
      //     .status(401)
      //     .json("This hotel is being booked. Can NOT delete");
      // }

      Room.findByIdAndDelete(id)
        .then(() => {
          return Room.find();
        })
        .then((roomArr) => {
          return res.json(roomArr);
        });
    });
};

// Get room cho admin pick khi tạo mới hotel
exports.getRoom = (req, res, next) => {
  Room.find().then((roomArr) => {
    return res.json(roomArr);
  });
};

// Add new hotel

exports.addNewHotel = (req, res, next) => {
  const hotelInput = req.body;
  const newHotel = new Hotel({
    name: hotelInput.nameInput,
    type: hotelInput.typeInput,
    city: hotelInput.cityInput,
    address: hotelInput.addressInput,
    distance: hotelInput.distanceInput,
    title: hotelInput.titleInput,
    photos: hotelInput.imagesInput.split("\n"),
    desc: hotelInput.descInput,
    rating: hotelInput.ratingInput || 0,
    cheapestPrice: hotelInput.priceInput,
    featured: hotelInput.featuredInput === "Yes" ? true : false,
    rooms: [...hotelInput.roomsInput],
  });
  newHotel.save().then((newHotel) => {
    console.log("Added new hotel");
    return res.status(200).json("Succeed");
  });
};

// Get hotel cho admin pick khi tạo mới room
exports.getHotel = (req, res, next) => {
  Hotel.find().then((hotel) => {
    return res.json(hotel);
  });
};

// Add new Room
exports.addNewRoom = (req, res, next) => {
  const roomInput = req.body;
  console.log(roomInput.roomNumbersInput);
  const roomNumArr = roomInput.roomNumbersInput.split(",");
  const newRoom = new Room({
    title: roomInput.titleInput,
    desc: roomInput.descInput,
    maxPeople: roomInput.maxPeopleInput,
    price: roomInput.priceInput,
    roomNumbers: roomNumArr.map((item) => item.trim()),
  });
  newRoom.save().then((newRoom) => {
    console.log("Added new hotel");

    return res.status(200).json("Succeed");
  });
};
