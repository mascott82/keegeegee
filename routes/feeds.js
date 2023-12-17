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
      res.render('feeds', { feeds });
    });
});

module.exports = router;
