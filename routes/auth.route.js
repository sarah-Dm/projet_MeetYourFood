const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require('mongoose');

// Route d'affichage du formulaire de création de compte (Visitor + Host)
router.get('/create-account', (req, res, next) => {
  res.render('auth/create-account');
});

// Route de traitement du formulaire de création de compte (Visitor + Host)
router.post(
  '/create-account',
  fileUploader.single('profilePic'), //visiteur ne peut poster qu'1 seule photo mais l'host doit pouvoir poser plusieurs photos (a minima profilePic + 1 photo)
  (req, res, next) => {
    const { profileType } = req.body;
    //option 1) si user est un user simple = visitor
    if (profileType === 'visitor') {
      const { firstName, lastName, userName, email, password } = req.body;
      const profilePic = req.file.path;
      const hashedPassword = bcryptjs.hashSync(password, salt);

      User.create({
        host: false,
        firstName,
        lastName,
        userName,
        email,
        hashedPassword,
        profilePic,
      })
        .then((user) => {
          res.send('Visitor created !', user);
        })
        .catch((err) => {
          console.log('error visitor not created');
          if (err instanceof mongoose.Error.ValidationError) {
            res
              .status(500)
              .render('auth/create-account', { errorMessage: err.message });
          } else {
            next(err);
          }
        });
      //option 2) si user est un user host
    } else {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        farmName,
        description,
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
      // const photos = req.file.path; //gérer plusieurs photos dans un 2e champs distinct de celui ProfilPic, que écrire en haut ? fileUploader.array('profilePic') sinon prévoir un 2e formulaire pour télécharger les photos de ferme
      const hashedPassword = bcryptjs.hashSync(password, salt);

      User.create({
        host: true,
        firstName,
        lastName,
        userName,
        email,
        hashedPassword,
        profilePic, //photo à gérer
      })
        .then((user) => {
          Host.create({
            userId: user.id,
            farmName,
            description,
            address,
            zipCode,
            city,
            farmType,
            activitiesType,
            certifications,
            public,
            photos, //photos à gérer
            openingDays,
            openingHoursStart,
            openingHoursEnd,
            spokenLanguages,
            maximumVisitors,
          })
            .then((host) => {
              //meme si email pas unique, passe dans then()
              res.send('Host created !', user, host);
            })
            .catch((err) => {
              console.log('error host not created');
              if (err instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/create-account', {
                  errorMessage: err.message,
                });
              } else {
                next(err);
              }
            });
        })
        .catch((err) => {
          console.log('error host not created');
          if (err instanceof mongoose.Error.ValidationError) {
            res
              .status(500)
              .render('auth/create-account', { errorMessage: err.message });
          } else if (err.code === 11000) {
            res.status(500).render('auth/create-account', {
              errorMessage:
                'Username and email need to be unique. Either username or email is already used.',
            });
          } else {
            next(err);
          }
        });
    }
  }
);

module.exports = router;
