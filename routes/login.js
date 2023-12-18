const express = require('express');
const router = express.Router();
const session = require('express-session');
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

  if (!userInfo) {
    return res.status(403).send("No account associated with that email was found.");
  } else {
    res.redirect("/f/feeds")
  }

/*   req.session.user_id = userInfo.id;
  console.log("userInfo.id", req.session.user_id)

  req.session.user_email = userInfo.email;
  console.log("userInfo.email", req.session.user_email) */

  console.log("req.session", req.session)

})


/* router.post("/logout", (req, res) => {
  req.cookie = null;
  res.redirect("/");
}); */

module.exports = router;

