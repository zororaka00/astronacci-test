const express = require('express');

const { UserService } = require('./service');

const app = express.Router();

app.get('/', (req, res, next) => {
  const tokenAuth = req.session.token_login;
  console.log({tokenAuth});
  if (tokenAuth) {
    const assetId = req.query.detail;
    assetId ? (new UserService()).detailContent(req, res, tokenAuth, assetId)
    : (new UserService()).dashboard(req, res, tokenAuth);
  } else {
    res.redirect('../');
  }
});

app.get('/logout', (req, res) => {
  req.session.token_login = null;
  res.redirect('../');
});

module.exports = app;
