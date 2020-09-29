const express = require("express");
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const router = express.Router();
const fileUploader = require("../configs/cloudinary.config");

// Route d'affichage du formulaire de création de compte (Visitor + Host)
router.get("/create-account", (req, res, next) => {
  res.render("auth/create-account");
});

// Route de traitement du formulaire de création de compte (Host)
router.post(
  "/create-account",
  fileUploader.single("photos"),
  (req, res, next) => {
    const {
      profileType,
      firstName,
      lastName,
      userName,
      email,
      password,
      farmName,
      description,
      website,
      address,
      zipCode,
      city,
      farmType,
      activitiesType,
      certifications,
      public,
      openingDays,
      openingHoursStart,
      openingHoursEnd,
      spokenLanguages,
      maximumVisitors,
    } = req.body;
    const photos = req.file.path;
    if (profileType === "visitor") {
      User.create({
          host: false,
          firstName,
          lastName,
          userName,
          email,
          hashedPassword: password,
        })
        .then((user) => {
          res.send("Visitor created !", user);
        })
        .catch((err) => next(err));
    } else {
      User.create({
          host: true,
          firstName,
          lastName,
          userName,
          email,
          hashedPassword: password,
        })
        .then((user) => {
          Host.create({
              userId: user.id,
              farmName,
              description,
              website,
              address,
              zipCode,
              city,
              farmType,
              activitiesType,
              certifications,
              public,
              openingDays,
              openingHoursStart,
              openingHoursEnd,
              spokenLanguages,
              maximumVisitors,
            })
            .then((host) => {
              res.send("Host created !", user, host);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  }
);

module.exports = router;