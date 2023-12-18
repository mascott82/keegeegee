const express = require('express');
const router = express.Router();
/* const cookieParser = require('cookie-parser') */
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('login');
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password })

  const userInfo = users.loginUser(email, password);

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

    res.redirect("/f/feeds")
  }
})


/* router.post("/logout", (req, res) => {
  req.cookie = null;
  res.redirect("/");
}); */

module.exports = router;

