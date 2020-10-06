const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const Comment = require('../models/Comment.model');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios').default;

// //récuperer les commentaires attribués à ce user
// axios
//   .get('/hosts/:userId', (req, res, next) => {
//     Comment.find({ dest_id: req.params.userId });
//   })
//   .then((comments) => res.render(('host/host-detail', { comments }))) //afficher les commentaires en base qui ont ce userId en destId
//   .catch((err) => {
//     next(err);
//   });

//Poster un nouveau commentaire
// axios.get('/:userId', (req, res, next) => {
//   const name = req.session.currentUser;
//   console.log(name);
//   res.send('test route comment');
// });

module.exports = router;
