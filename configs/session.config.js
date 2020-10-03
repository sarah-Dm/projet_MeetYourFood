const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = (app) => {
  app.use(
    session({
      secret: 'maPhraseSecrete',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 6000000 }, // en commentaire car pas de durer limite
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
