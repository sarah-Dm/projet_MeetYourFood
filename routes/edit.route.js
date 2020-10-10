const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const fileUploader = require('../configs/cloudinary.config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require('mongoose');
const router = express.Router();

//Route d'affichage du formulaire d'édition Host + Visitor
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      //si le user n'est pas logué, retour à la page de login
      if (!req.session.currentUser) {
        res.redirect(`/login`);
      } //si le user n'est pas propriétaire de la fiche, retour à la page de login/sa page de compte s'il est logué
      else if (req.session.currentUser._id !== user.id) {
        res.redirect(`/login`);
      }
      //si le user est bien la propriétaire de la fiche, la page de edit s'affiche 
      else if (!user.host) {
        res.render('user/edit-visitor', {
          user,
        });
      } else {
        Host.findOne({
            userId: req.params.userId,
          })
          .populate("User")
          .then((host) => {
            res.render("host/edit-host", {
              user,
              host,
              farmTypes: host.farmType, // ['']
              allFarms: Host.schema.path("farmType").caster.enumValues,
              farmActivities: host.activitiesType,
              allActivities: Host.schema.path("activitiesType").caster.enumValues,
              farmCity: [`${host.city}`],
              allCities: Host.schema.path("city").enumValues,
              farmCertifications: host.certifications,
              allCertifications: Host.schema.path("certifications").caster.enumValues,
              farmPublics: host.public,
              allPublics: Host.schema.path("public").caster.enumValues,
              farmDays: host.openingDays,
              allDays: Host.schema.path("openingDays").caster.enumValues,
              farmLanguages: host.spokenLanguages,
              allLanguages: Host.schema.path("spokenLanguages").caster.enumValues,
            });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

// Route de traitement du formulaire d'édition Host + Visitor
router.post('/:userId', fileUploader.single('profilePic'), (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      console.log(user);
      if (!user.host) {
        const {
          firstName,
          lastName,
          userName,
          email,
          password
        } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, salt);
        //const profilePic = req.file.path;
        User.findByIdAndUpdate(req.params.userId, {
            firstName,
            lastName,
            userName,
            email,
            hashedPassword,
          }, {new: true})
          .then((user) => {
            res.render('user/edit-visitor', {
              user,
              validationMessage: 'Your account has been updated',
            });
          })
          .catch((err) => {
            console.log('visitor not edited !');
            if (err instanceof mongoose.Error.ValidationError) {
              res.status(500).render('edit/edit-visitor', {
                errorMessage: err.message,
              });
            }
          });
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
        //const profilePic = req.file.path;
        const hashedPassword = bcryptjs.hashSync(password, salt);
        User.findByIdAndUpdate(req.params.userId, {
            firstName,
            lastName,
            userName,
            email,
            hashedPassword,
          }, {new: true})
          .then((user) => {
            Host.findOneAndUpdate({
                userId: user.id,
              }, {
                farmName,
                description,
                address,
                zipCode,
                city,
                farmType,
                activitiesType,
                certifications,
                public,
                // photos, //photos à gérer
                openingDays,
                openingHoursStart,
                openingHoursEnd,
                spokenLanguages,
                maximumVisitors,
              }, {new: true})
              .then((host) => {
                res.render('host/edit-host', {
                  user,
                  host,
                  validationMessage: "Your account has been updated",
                  farmTypes: host.farmType, // ['']
                  allFarms: Host.schema.path("farmType").caster.enumValues,
                  farmActivities: host.activitiesType,
                  allActivities: Host.schema.path("activitiesType").caster.enumValues,
                  farmCity: [`${host.city}`],
                  allCities: Host.schema.path("city").enumValues,
                  farmCertifications: host.certifications,
                  allCertifications: Host.schema.path("certifications").caster.enumValues,
                  farmPublics: host.public,
                  allPublics: Host.schema.path("public").caster.enumValues,
                  farmDays: host.openingDays,
                  allDays: Host.schema.path("openingDays").caster.enumValues,
                  farmLanguages: host.spokenLanguages,
                  allLanguages: Host.schema.path("spokenLanguages").caster.enumValues,
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
                    errorMessage: 'Username and email need to be unique. Either username or email is already used.',
                  });
                } else {
                  next(err);
                }
              });
          })
          .catch((err) => {
            console.log('host not edited !');
            if (err instanceof mongoose.Error.ValidationError) {
              res.status(500).render('host/edit-host', {
                errorMessage: err.message,
              });
            }
          });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;