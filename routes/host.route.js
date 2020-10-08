const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');

router.get('/:userId', (req, res, next) => {
  //Accès au détail des fiches host que si user est logué, sinon redirection vers login page
  if (!req.session.currentUser) {
    res.redirect('/login');
    return;
  }
  const currentUser = req.session.currentUser;
  User.findById(req.params.userId)
    .then((user) => {
      Host.findOne({
        userId: req.params.userId,
      })
        .populate('User')
        .then((host) => {
          Comment.find({ dest_id: req.params.userId })
            .populate('author_id')
            .then((comments) => {
              console.log(comments);
              res.render('host/host-detail', {
                user,
                host,
                currentUser,
                comments,
              });
            });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

//créer un nouveau commentaire
router.post('/:userId', (req, res, next) => {
  const author_id = req.session.currentUser;
  const dest_id = req.params.userId;
  const { name, rate, text, averageCart } = req.body;
  Comment.create({
    dest_id,
    author_id,
    name,
    rate,
    text,
    averageCart,
  })
    .then((comment) => {
      res.redirect(`/hosts/${dest_id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
