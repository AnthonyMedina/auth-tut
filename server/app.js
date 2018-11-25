const app = require('express')();
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(
  session({
    genid: req => {
      console.log('Inside the session middleware');
      console.log(req.sessionID);
      return uuid();
    },
    store: new FileStore(),
    secret: 'ants',
    resave: false,
    saveUninitialized: true
  })
);

app.get('/', (req, res) => {
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  res.json({ msg: `👋` });
});

module.exports = app;
