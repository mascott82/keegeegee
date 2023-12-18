const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
const { getUsers, addUser, loginUser, getUserIDByEmail  } = require('../db/queries/users')

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
}

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log(req.body)
  const randomUserID = generateRandomString();
  const { full_name, email, password } = req.body;
  const newUser = {
    id: randomUserID,
    full_name,
    email,
    password,
  };

  if (!email || !password) {
    return res.status(400).send("Error: email and password is required");
  }

  if (getUserIDByEmail(email, users)) {
    return res.status(404).send("User already exists");
  }

  users[newUser.id] = newUser;
  users.id = randomUserID;
  users.email = email;
  res.redirect("/f/feeds");
});


module.exports = router;

