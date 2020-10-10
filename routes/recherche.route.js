const express = require('express');
const User = require('../models/User.model');
const Host = require('../models/Host.model');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  let {
    location,
    day,
    visitor,
    certification,
    farmType,
    activityType,
    public,
    language,
  } = req.query;
  console.log(
    'req.query',
    location,
    day,
    visitor,
    certification,
    farmType,
    activityType,
    public,
    language
  );
  const farmTypes = Host.schema.path('farmType').caster.enumValues;
  const activitiesType = Host.schema.path('activitiesType').caster.enumValues;
  const cities = Host.schema.path('city').enumValues;
  const allCertifications = Host.schema.path('certifications').caster
    .enumValues;
  const publics = Host.schema.path('public').caster.enumValues;
  const languages = Host.schema.path('spokenLanguages').caster.enumValues;
  let query = {};
  if (
    location === '' &&
    day === '' &&
    visitor === '' &&
    certification === '' &&
    farmType === '' &&
    activityType === '' &&
    public === '' &&
    language === ''
  ) {
    Host.find({})
      .populate('userId')
      .then((resultats) => {
        console.log('resultats', resultats.length);
        res.render('recherche/recherche', {
          resultats,
          farmTypes,
          activitiesType,
          allCertifications,
          cities,
          publics,
          languages,
        });
      })
      .catch((err) => next(err));
  } else {
    if (location === '') query.city = null;
    if (location != null) query.city = location;
    if (day === '') query.openingDays = null;
    if (day != null) query.openingDays = day;
    if (visitor === '') query.maximumVisitors = null;
    if (visitor != null) query.maximumVisitors = visitor;
    if (certification === '') query.certifications = null;
    if (certification != null) query.certifications = certification;
    if (activityType === '') query.activitiesType = null;
    if (activityType != null) query.activitiesType = activityType;
    if (farmType === '') query.farmTypes = null;
    if (farmType != null) query.farmTypes = farmType;
    if (public === '') query.publics = null;
    if (public != null) query.publics = public;
    if (language === '') query.languages = null;
    if (language != null) query.languages = language;
    console.log('query : ', query);
    Host.find({
      $and: [
        {
          city: query.city,
        },
        {
          $or: [
            { certifications: query.certifications },
            { farmType: query.farmTypes },
            { activitiesType: query.activitiesType },
            { public: query.publics },
            { openingDays: query.openingDays },
            { spokenLanguages: query.spokenLanguages },
            { maximumVisitors: { $gte: query.maximumVisitors } },
          ],
        },
      ],
    })
      .populate('userId')
      .then((resultats) => {
        console.log('resultats', resultats.length);
        res.render('recherche/recherche', {
          resultats,
          farmTypes,
          activitiesType,
          allCertifications,
          cities,
          publics,
          languages,
          location,
          visitor,
        });
      })
      .catch((err) => next(err));
  }
  // if (!visitors) {
  //   visitors = 1;
  // }
  // //si tout les champs sont précisés
  // if (location && day) {
  //   Host.find({
  //     $and: [
  //       { $text: { city: location } }, //A FAIRE - faire liste des localisations enregistrées quand on tape
  //       { openingDays: day },
  //       { maximumVisitors: { $gte: visitors } },
  //     ],
  //   })
  //     .populate('userId')
  //     .then((resultats) => {
  //       res.render('recherche/recherche', { resultats });
  //     })
  //     .catch((err) => next(err));
  //   //si le champ day n'est pas précisé
  // } else if (location && !day) {
  //   Host.find({
  //     $and: [
  //       { city: location }, //A FAIRE - faire liste des localisations enregistrées quand on tape
  //       { maximumVisitors: { $gte: visitors } },
  //     ],
  //   })
  //     .populate('userId')
  //     .then((resultats) => {
  //       res.render('recherche/recherche', { resultats });
  //     })
  //     .catch((err) => next(err));
  //   //si le champ location n'est pas précisé
  // } else if (!location && day) {
  //   Host.find({
  //     $and: [{ openingDays: day }, { maximumVisitors: { $gte: visitors } }],
  //   })
  //     .populate('userId')
  //     .then((resultats) => {
  //       res.render('recherche/recherche', { resultats });
  //     })
  //     .catch((err) => next(err));
  // } else {
  //   Host.find({
  //     maximumVisitors: { $gte: visitors },
  //   })
  //     .populate('userId')
  //     .then((resultats) => {
  //       res.render('recherche/recherche', { resultats, certifications });
  //     })
  //     .catch((err) => next(err));
  // }
});

//option : faire une recherche dynamique pour les noms des villes

module.exports = router;
