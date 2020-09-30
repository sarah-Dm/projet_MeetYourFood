const express = require("express");
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    console.log(user)
    Host.findOne({
      userId: req.params.userId
    }).populate('User').then(host => {
      console.log(host)
      res.render('host/host-detail', {
        user,
        host
      })
    }).catch(err => next(err))
  }).catch(err => next(err))

})

module.exports = router;