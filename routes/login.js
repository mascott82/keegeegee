const express = require('express');
const router = express.Router();
const session = require('express-session');
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('login', users);
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Error: email and password is required");
  }

  users.loginUser(email, password)
    .then((data) => {
      if (data.length === 0) {
        return res.status(403).send("Email or password is incorrect. Please try again.");
      }
      const username = data[0].username
      req.session.username = username;
      res.redirect("/f/feeds")
    })
    .catch(error => {
      console.error('Error searching user: ', error);
    });
})

/* router.post("/logout", (req, res) => {
  req.cookie = null;
  res.redirect("/");
}); */

module.exports = router;

