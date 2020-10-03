const express = require("express");
const User = require("../models/User.model");
const Host = require("../models/Host.model");
const fileUploader = require("../configs/cloudinary.config");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const mongoose = require("mongoose");
const router = express.Router();

// Route d'affichage du formulaire d'édition Host + Visitor
router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user.host) {
        res.render("user/edit-visitor", {
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
            });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

// Route de traitement du formulaire d'édition Host + Visitor
// router.post('/:id', (req, res, next) => {
//   const {
//     firstName,
//     lastName,
//     userName,
//     email,
//     password
//   } = req.body;
//   //const hashedPassword = bcryptjs.hashSync(password, salt);
//   console.log(req.body)
//   // User.findById(req.params.id)
//   //   .then(user => {
// Option 1 : Edit visitor
//     if (!user.host) {

//const profilePic = req.file.path;
// User.findByIdAndUpdate(req.params.userId, {
//     firstName,
//     lastName,
//     userName,
//     email,
//     hashedPassword,
//   })
//   .then(user => {
//     console.log('edit user', user);
//     res.send('visitor modified')
//     //res.redirect(`/user/${user.id}`)
//   })
//   .catch(err => {
//     console.log('visitor not edited !');
//     if (err instanceof mongoose.Error.ValidationError) {
//       res
//         .status(500)
//         .render('auth/create-account', {
//           errorMessage: err.message
//         });
//     } else {
//       next(err)
//     }
//   });
//   //   })
//   //   .catch(err => next(err))
// });

router.post("/:userId", (req, res, next) => {
  console.log(req.body.email);
  res.send(req.body);
});

module.exports = router;
