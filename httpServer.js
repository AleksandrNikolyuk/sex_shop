const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');
const session = require('express-session');
const authController = require('controllers/auth');
const sassMiddleware = require('node-sass-middleware');
const i18n = require('i18n');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name: config.get('session:name'),         
  resave: false,                            
  saveUninitialized: false,
  secret: config.get('session:secret'),     
  cookie: {
    maxAge: config.get('session:lifetime'), 
    sameSite: true,
    secure: config.get('session:in_prod'), 
  }
}));

i18n.configure({
  locales:['en', 'ru'],
  directory: __dirname + '/locales',
  defaultLocale: 'ru',
});
app.use(i18n.init);

app.use(authController.getUserFromDatabaseBySessionUserId);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
