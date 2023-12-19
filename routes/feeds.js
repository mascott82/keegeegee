/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const feed = require('../db/queries/feeds');

router.get('/feeds', (req, res) => {
  feed.getFeeds()
    .then(feeds => {
      const templateVars = { username: req.session.username, userId: req.session.userId, feeds }
      res.render('feeds', templateVars);
    });
});

router.get('/new', (req, res) => {
  res.render('newFeed');
});

module.exports = router;
