const app = require('express')();
const uuid = require('uuid/v4');

app.get('/', (req, res) => {
  res.json({ msg: `👋, here is a unique id: ${uuid()}` });
});

module.exports = app;
