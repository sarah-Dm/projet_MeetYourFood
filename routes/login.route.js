const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require('mongoose');

// require('.configs/session.config')(app);

router.get('/login', (req, res, next) => {
  //si le user est logué, sa page perso s'affiche
  if (req.session.currentUser) {
    console.log(req.session.currentUser);
    res.redirect(`/profile/${req.session.currentUser._id}`);
    //si le user n'est pas logué, la page de login s'affiche
  } else {
    res.render('auth/login');
  }
});

router.post('/login', (req, res, next) => {
  // if (req.session.currentUser) {
  //   res.redirect('/profile/:userId');
  // }
  const {
    email,
    password
  } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.',
    });
    return;
  }
  User.findOne({
      email,
    })
    .then((user) => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: 'Email is not registered. Try with other email.',
        });
        return;
      } else if (bcryptjs.compareSync(password, user.hashedPassword)) {
        req.session.currentUser = user;
        res.render('user/profile', {
          user: req.session.currentUser,
        });
      } else {
        res.render('auth/login', {
          errorMessage: 'Incorrect password.',
        });
      }
    })
    .catch((err) => next(err));
});

// Route affichage profil visitor  à l'édition ou au clic sur profile
router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    console.log(user);
    //si le user n'est pas logué, retour à la page de login/sa page de compte s'il est logué
    if (!req.session.currentUser) {
      res.redirect(`/login`);
      //si le user n'est pas propriétaire de la fiche, retour à la page de login/sa page de compte s'il est logué
    } else if (req.session.currentUser._id !== user.id) {
      res.redirect(`/login`);
    }
    //si le user est bien la propriétaire de la fiche, la page de profile s'affiche
    else {
      res.render('user/profile', {
        user,
      });
    }
  });
});

//logout
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;