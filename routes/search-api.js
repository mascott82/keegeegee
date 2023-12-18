/*
 * All routes for searching are defined here
 * Since this file is loaded in server.js into /s,
 *   these routes are mounted onto /s
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const feed = require('../db/queries/feeds');

router.post('/', (req, res) => {
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;

  feed.getFeedsByPrice(minPrice, maxPrice)
    .then(feeds => {
      res.send(feeds);
    });
});

module.exports = router;
