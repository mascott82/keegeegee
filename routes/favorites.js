/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


router.get('/favorites', (req, res) => {
  let sortby = req.query.sortby;
  let sortedFavorites;

  let favorites = [
    { title: 'Laptop', price: 100, description: "Brand new laptop with high-performance specifications", date: new Date(2023, 12, 15), status: 'Available' },
    { title: 'Smartphone', price: 200, description: "Latest model smartphone with advanced features", date: new Date(2023, 12, 17), status: 'Sold out' },
    { title: 'Coffee Maker', price: 300, description: "Premium coffee maker for brewing delicious coffee", date: new Date(2023, 12, 12), status: 'Sold out' },
  ];

  switch (sortby) {
  case 'price_asc':
    sortedFavorites = favorites.sort((a, b) => a.price - b.price);
    break;
  case 'price_desc':
    sortedFavorites = favorites.sort((a, b) => b.price - a.price);
    break;
  case 'date_asc':
    sortedFavorites = favorites.sort((a, b) => a.date - b.date);
    break;
  case 'date_desc':
    sortedFavorites = favorites.sort((a, b) => b.date - a.date);
    break;
  case 'availability':
    sortedFavorites = favorites.filter(item => item.status === 'Available');
    break;
  default:
    sortedFavorites = favorites;
  }

  res.render('favorites', { favorites: sortedFavorites });
});

module.exports = router;
