const express = require("express");
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const router = express.Router();
const fileUploader = require("../configs/cloudinary.config");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require("mongoose");

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }
  User.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.hashedPassword)) {
        res.render("user/user-profile", {
          user,
        });
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password.",
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
