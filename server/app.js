const app = require('express')();
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [{ id: '2f24vvg', email: 'test@test.com', password: 'password' }];

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('Inside local strategy callback');
    const user = users[0];
    if (email === user.email && password === user.password) {
      console.log('Local strategy returned true');
      return done(null, user);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(
    'Inside serializeUser callback. User id is save to the session file store here'
  );
  done(null, user.id);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(passport.initialize());
app.use(passport.session());

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
  .post((req, res, next) => {
    console.log('Inside POST /login callback function');
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(
        `req.session.passport: ${JSON.stringify(req.session.passport)}`
      );
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      req.login(user, err => {
        console.log('Inside req.login() callback');
        console.log(
          `req.session.passport: ${JSON.stringify(req.session.passport)}`
        );
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        return res.json({ msg: 'You were authenticated & logged in!' });
      });
    })(req, res, next);
  });

module.exports = app;
