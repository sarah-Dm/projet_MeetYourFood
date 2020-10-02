const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require('mongoose');

// Route d'affichage du formulaire d'édition Host + Visitor
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    if (!user.host) {
      res.render('user/edit-visitor', {
        user
      })
    } else {
      res.render('/host/edit-host')
    }

  }).catch(err => next(err))


})

// Route de traitement du formulaire d'édition Host + Visitor

module.exports = router;