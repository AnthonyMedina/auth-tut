const app = require('express')();

app.get('/', (req, res) => {
  res.json({ msg: '👋' });
});

module.exports = app;
