const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config'); // multer
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require('mongoose');

// Route d'affichage du formulaire de création de compte (Visitor + Host)
router.get('/create-account', (req, res, next) => {
  console.log(
    req.query,
    req.query ===
      {
        host: '1',
      }
  );

  res.render('auth/create-account', {
    host: req.query.host === '1', // true ou false
  });
});

// Route de traitement du formulaire de création de compte (Visitor + Host)

router.post(
  '/create-account',
  fileUploader.fields([
    {
      name: 'profilePic',
    },
    {
      name: 'photos',
    },
  ]), //pour gérer plusieurs photos dans différents champs
  (req, res, next) => {
    // console.log(req.files);
    const { profileType } = req.body;
    //option 1) si user est un user simple = visitor
    if (profileType === 'visitor') {
      const { firstName, lastName, userName, email, password } = req.body;
      const profilePic = req.files['profilePic'][0].path;
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
          console.log('user', user);
          // req.flash('message creation', "Your account has been created !")
          res.render(`/profile/${user.id}`); 
        })
        .catch((err) => {
          console.log('error host not created');
          if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/create-account', {
              errorMessage: err.message,
            });
          } else if (err.code === 11000) {
            res.status(500).render('auth/create-account', {
              errorMessage:
                'Username and email need to be unique. Either username or email is already used.',
            });
          } else {
            next(err);
          }
        });
      //option 2) si user est un user host
    } else {
      const photos = req.files['photos'].map((el) => {
        //pour gérer plusieurs photos dans un meme champs
        return el.path;
      });
      const profilePic = req.files['profilePic'][0].path;
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

      const hashedPassword = bcryptjs.hashSync(password, salt);

      User.create({
        host: true,
        firstName,
        lastName,
        userName,
        email,
        hashedPassword,
        profilePic,
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
            photos,
            openingDays,
            openingHoursStart,
            openingHoursEnd,
            spokenLanguages,
            maximumVisitors,
          })
            .then((host) => {
              //meme si email pas unique, passe dans then()
              console.log('host', host);
              // res.send('Host created !');
              res.redirect(`/profile/${user.id}`);
            })
            .catch((err) => {
              console.log('error host not created');
              if (err instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/create-account', {
                  errorMessage: err.message,
                });
              } else if (err.code === 11000) {
                res.status(500).render('auth/create-account', {
                  errorMessage:
                    'Username and email need to be unique. Either username or email is already used.',
                });
              } else {
                next(err);
              }
            });
        })
        .catch((err) => {
          console.log('error host not created');
          if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/create-account', {
              errorMessage: err.message,
            });
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
