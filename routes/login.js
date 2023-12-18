const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
const users = require('../db/queries/users');

const getUserIDByEmail = (email, users) => {
  for (let userID in users) {
    if (users[userID].email === email) {
      return userID;
    }
  }
  return false;
};

router.get('/login', (req, res) => {
  res.render('login');
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const userInfo = getUserIDByEmail(email, users);

  if (!email || !password) {
    return res.status(400).send("Error: email and password is required");
  }

  for (user in users) {
    if (!userInfo) {
      return res.status(403).send("No account associated with that email was found.");
    }

    if (userInfo) {
      if (!req.body.password !== userInfo.password) {
        return res.status(403).send("Password is incorrect.");
      }
    }

  res.cookie("email", email)
  res.redirect("/f/feeds")
  }
})

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

module.exports = router;

