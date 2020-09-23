const express = require('express');
const router = express.Router();

//routes
router.get('/', (req, res, next) => {
  const data = {
    layout: false,
  };
  res.render('home', data);
});

router.get('/resultats', (req, res, next) => {
  res.render('resultat-recherche');
});

router.get('/product_hote', (req, res, next) => {
  res.render('product_hote_creation');
});

router.get('/mon_compte', (req, res, next) => {
  res.render('mon_compte');
});

module.exports = router;
