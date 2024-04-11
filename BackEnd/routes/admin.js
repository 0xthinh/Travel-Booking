const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/admin/add-room", adminController.addNewRoom);
router.post("/admin/add-hotel", adminController.addNewHotel);
router.get("/admin/:list", adminController.getListData);
router.get("/admin", adminController.getTransactions);
router.post("/delete-hotel", adminController.deleteHotel);
router.post("/delete-room", adminController.deleteRoom);
router.get("/get-room", adminController.getRoom);
router.get("/get-hotel", adminController.getHotel);

module.exports = router;
