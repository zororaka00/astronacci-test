require('dotenv').config();
const initialize = require('./initialize');
initialize();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const ENV = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: ENV.FACEBOOK_CLIENT_ID,
//       clientSecret: ENV.FACEBOOK_CLIENT_SECRET,
//       callbackURL: '/auth/facebook/callback',
//       profileFields: ['id', 'displayName', 'email'],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );
passport.serializeUser((user, done) => { 
  done(null, user); 
}); 

passport.deserializeUser((user, done) => { 
  done(null, user);
}); 

app.use(
  session({
    secret: ENV.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
