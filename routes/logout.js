const express = require('express');
const router = express.Router();
const session = require('express-session');
const users = require('../db/queries/users');

router.post('/', (req, res) => {
  req.session.destroy();
  res.redirect('/f/feeds')
});

module.exports = router;