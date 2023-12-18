const express = require('express');
const router  = express.Router();


const users = require('../db/queries/users');

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;

