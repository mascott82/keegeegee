/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const favQry = require('../db/queries/favourites');


const _customSortQryResult = function(_qryResult, _sortPolicy) {
  // _sortPolicy comes from API req.
  let sortedFavorites;
  switch (_sortPolicy) {
  case 'price_asc':
    sortedFavorites = _qryResult.sort((a, b) => a.price - b.price);
    break;
  case 'price_desc':
    sortedFavorites = _qryResult.sort((a, b) => b.price - a.price);
    break;
  case 'date_asc':
    sortedFavorites = _qryResult.sort((a, b) => a.date - b.date);
    break;
  case 'date_desc':
    sortedFavorites = _qryResult.sort((a, b) => b.date - a.date);
    break;
  case 'availability':
    sortedFavorites = _qryResult.filter(item => item.status === 'Available');
    break;
  default:
    sortedFavorites = _qryResult;
  }
  return sortedFavorites;
};

router.get('/favorites', (req, res) => {
  // without any row limit info, just limit by default row limit at queries/favourites.js
  req.session.loginstatus = {userid:1};  // TODO: replace this hard-coded loginstatus with actual session cookies
  if (req.session.loginstatus) {
    // request user's favorites information against database via query
    favQry.getFavourites(req.session.loginstatus.userid).then(favs => {
      const _sortedResult = _customSortQryResult(favs, req.query.sortby);
      res.render('favorites', { favorites: _sortedResult });
    });
  } else {
    // redirect to login page
    res.status(400).send({message:"login required"}); // TODO: replace this raw error msg with actual login page redirection
  }
});


router.get('/favorites/:userid/:rowlimit', (req, res) => {
  req.session.loginstatus = {userid:1};  // TODO: replace this hard-coded loginstatus with actual session cookies
  if (req.session.loginstatus) {
    const userId = req.params.userid;

    // follow request rowLimit
    const rowLimit = req.params.rowlimit;
    console.log("post(/favorites) input");
    console.log(userId, rowLimit);
    favQry.getFavourites(userId, rowLimit).then(favs => {
      const _sortedResult = _customSortQryResult(favs, req.query.sortby);
      res.render('favorites', { favorites: _sortedResult });
    });

  } else {
    // redirect to login page
    res.status(400).send({message:"login required"}); // TODO: replace this raw error msg with actual login page redirection
  }
});

module.exports = router;
