// dependencies
var cookieSession     = require('cookie-session')
var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var expressValidator  = require('express-validator');
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var multipart         = require('connect-multiparty');
var moment            = require('moment');

//Connect to mongo db
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cvcreator');
var db = mongoose.connection;
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

// require routes
var router          = require('./app/routes/index.js');
var user          = require('./app/routes/user.js');
var skill          = require('./app/routes/skill.js');
var project          = require('./app/routes/project.js');
var toPDF          = require('./app/download/toPDF.js');
var validation          = require('./app/validation.js');

// create instance of express
var app = express();

//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set Static Folder
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.static(path.join(__dirname + '/public')));

//CookieSession
app.use(cookieSession({
  name: 'session',
  secret: 'keyboard cat'
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator(validation));

// routes
app.use('/', router);
app.use('/user', user);
app.use('/skill', skill);
app.use('/project', project);
app.use('/download', toPDF);

app.use(function (err, req, res, next) {
  res.status(500).json(err);
});

module.exports = app;