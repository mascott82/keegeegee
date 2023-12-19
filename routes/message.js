/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const msgs = require('../db/queries/messages');

router.get('/list', (req, res) => {
  const toUserId = req.session.userId ? req.session.userId : 1;
  const toUserName = req.session.username ? req.session.username : '';
  msgs.getMessagesByUser(toUserId)
    .then((result) => {
      res.render("messages", { result: result, userId: toUserId, username: toUserName });
    })
    .catch(error => {
      console.error("Error retrieving the message. ", error);
    });
});

module.exports = router;
