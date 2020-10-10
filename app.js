require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

//user est accessible parout
module.exports = (req, res, next) => {
  res.locals.user = req.session.currentUser;
  next();
};

mongoose
  //'mongodb://localhost/meetyourfoode'
  //process.env.MONGODB_URI

  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();
require('./configs/session.config')(app);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

// Express View engine setup
app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true,
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Helpers HBS
require('handlebars-helpers')({
  handlebars: hbs,
});

hbs.registerPartials(__dirname + '/views/partials');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use((req, res, next) => {
  if (req.session.currentUser) res.locals.currentUser = req.session.currentUser;

  next();
});

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth.route');
app.use('/', auth);

const login = require('./routes/login.route');
app.use('/', login);

const host = require('./routes/host.route');
app.use('/hosts', host);

const hosts = require('./routes/recherche.route');
app.use('/hosts', hosts);

const edit = require('./routes/edit.route');
app.use('/edit', edit);

module.exports = app;
