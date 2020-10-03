const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Host.find()
    .populate('userId')
    .then((resultats) => {
      res.render('recherche/recherche', { resultats });
    })
    .catch((err) => next(err));
});

module.exports = router;
