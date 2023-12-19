/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const feed = require('../db/queries/feeds');

const multer = require('multer');
const path = require('path');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination:  'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('feedImage'), (req, res) => {
  const title = req.body.feedTitle;
  const price = req.body.feedPrice;
  // const imageUrl = req.body.feedImage;
  const imageUrl = req.file ? req.file.filename : '';
  const description = req.body.feedDesc;
  const userId = req.session.userId ? req.session.userId : 3;

  const newFeed = {
    title:  title,
    price:  price,
    imageUrl: `http://localhost:8080/uploads/${imageUrl}`,
    desc: description,
    isAvailable:  true,
    userId: userId
  };

  feed.addFeed(newFeed)
    .then(() => {
      console.log('Item added successfully!');
      res.redirect('/f/feeds');
    })
    .catch(error => {
      console.error('Error adding item: ', error);
    });
});

router.post('/:id/delete', (req, res) => {
  const feedId = req.body.feedId;

  feed.deleteFeed(feedId)
    .then(() => {
      console.log('Deleted the feed successfully! ');
      res.send({ message: 1 });
    })
    .catch(error => {
      console.error("Error deleting the feed. ", error);
    });
});

router.post('/:id', (req, res) => {
  const feedId = req.body.feedId;

  feed.updateFeedAvailability(feedId, false)
    .then(() => {
      console.log('Marked the feed successfully! ');
      res.send({ message: 1 });
    })
    .catch(error => {
      console.error("Error marking the feed. ", error);
    });
});

module.exports = router;