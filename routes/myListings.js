const express = require('express');
const router  = express.Router();
const session = require('express-session');
const users = require('../db/queries/users');
const feed = require('../db/queries/feeds');

router.get('/', (req, res) => {
  feed.getFeeds()
  .then(feeds => {
    const templateVars = { username: req.session.username, userId: req.session.userId, feeds }
    res.render('myListings', templateVars);
  });
});


module.exports = router;
