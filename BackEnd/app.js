const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const app = express();
const cors = require("cors");

// Khai báo giải mã body request
app.use(cors());
app.use(express.json());

// AUTHENTICATION LOGIN
// Check xem có username vs password có trùng vs user nào trong db không
app.post("/login", (req, res, next) => {
  let userLoggedIn;

  User.find()
    .then((users) => {
      console.log(users);
      return (userLoggedIn = users.find(
        (user) =>
          user.username === req.body.username &&
          user.password === req.body.password
      ));
    })

    // Nếu có thì login còn không thì báo lỗi
    .then(() => {
      if (userLoggedIn) {
        req.user = userLoggedIn;
        res.status(200).json({ success: true, userLoggedIn });
      } else
        res
          .status(404)
          .json({ success: false, message: "Incorrect username/password" });
    });
});

// SIGN UP
app.post("/signup", (req, res, next) => {
  console.log(req);
  // Check xem có username nào trùng username đăng ký không?
  const { username, password, fullName, phone, email } = req.body;
  User.find().then((users) => {
    const userSignUp = users.find(
      (user) => user.username === req.body.username
    );
    // Nếu đã tồn tại username thì báo lỗi
    if (userSignUp) {
      return res
        .status(402)
        .json({ success: false, message: "Username has already been taken" });
    }
    // Nếu chưa có thì lưu vào database
    const user = new User({
      username,
      password,
      fullName,
      phone,
      email,
      isAdmin: username === "admin" ? true : false,
    });
    user.save().then((user) => {
      return res.status(200).json({ success: true, message: user });
    });
  });
});

// Khai báo routes & middleware
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/client");

app.use(adminRoutes);
app.use(clientRoutes);

// Connect mongoose
mongoose
  .connect("mongodb+srv://taikhoan2609:matkhau2609@asm-02.bzwufej.mongodb.net/")
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
