// ROUTE
const express = require("express");

const clientController = require("../controllers/client");

const router = express.Router();

router.get("/featured", clientController.getHotelList);

router.post("/hotels", clientController.getSuitableHotels);

router.post("/booking", clientController.bookHotel);

router.post("/transactions", clientController.getTransactions);

module.exports = router;
