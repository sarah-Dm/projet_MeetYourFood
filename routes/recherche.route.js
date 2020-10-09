const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  let { location, day, visitors } = req.query;
  console.log('location:', location, 'day:', day, 'visitors:', visitors);
  if (!visitors) {
    visitors = 1;
  }
  //si tout les champs sont précisés
  if (location && day) {
    Host.find({
      $and: [
        { city: location }, //A FAIRE - faire liste des localisations enregistrées quand on tape
        { openingDays: day },
        { maximumVisitors: { $gte: visitors } },
      ],
    })
      .populate('userId')
      .then((resultats) => {
        res.render('recherche/recherche', {
          resultats,
          location,
          visitors,
          day, //preselect not working because <select>
        });
      })
      .catch((err) => next(err));
    //si le champ day n'est pas précisé
  } else if (location && !day) {
    Host.find({
      $and: [
        { city: location }, //A FAIRE - faire liste des localisations enregistrées quand on tape
        { maximumVisitors: { $gte: visitors } },
      ],
    })
      .populate('userId')
      .then((resultats) => {
        res.render('recherche/recherche', {
          resultats,
          location,
          visitors,
        });
      })
      .catch((err) => next(err));
    //si le champ location n'est pas précisé
  } else if (!location && day) {
    Host.find({
      $and: [{ openingDays: day }, { maximumVisitors: { $gte: visitors } }],
    })
      .populate('userId')
      .then((resultats) => {
        res.render('recherche/recherche', {
          resultats,
          visitors,
          day,
        });
      })
      .catch((err) => next(err));
  } else {
    Host.find({
      maximumVisitors: { $gte: visitors },
    })
      .populate('userId')
      .then((resultats) => {
        res.render('recherche/recherche', { resultats, visitors });
      })
      .catch((err) => next(err));
  }
});

//option : faire une recherche dynamique pour les noms des villes

module.exports = router;
