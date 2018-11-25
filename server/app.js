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

app
  .route('/login')
  .get((req, res) => {
    console.log('Inside GET /login callback function');
    console.log(req.sessionID);
    res.send(`You got the login page!\n`);
  })
  .post((req, res) => {
    console.log('Inside POST /login callback function');
    console.log(req.body);
    res.send(`You posted to the login page!\n`);
  });

module.exports = app;
