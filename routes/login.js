const express = require('express');
const router = express.Router();
const session = require('express-session');
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  users.getUsers()
    .then(data => {
      console.log({data})
      res.render('login', { data });
    })
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
      const username = data[0].username;
      const userId = data[0].id;
      req.session.username = username;
      req.session.userId = userId;
      res.redirect("/f/feeds");
    })
    .catch(error => {
      console.error('Error searching user: ', error);
    });
});

/* router.post("/logout", (req, res) => {
  req.cookie = null;
  res.redirect("/");
}); */

module.exports = router;

