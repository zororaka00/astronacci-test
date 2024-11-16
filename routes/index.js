const passport = require('passport');

const { AuthService } = require('./service');

const express = require('express');
const app = express.Router();

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => (new AuthService()).login(req, res));

app.get('/', (req, res, next) => {
  res.render('login');
});

module.exports = app;
