const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
const { getUsers, addUser, loginUser } = require('../db/queries/users')

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
}

/* const addUser = (user) => {
  return db.query(`INSERT INTO users (username, email, password, full_name, created_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
  [user.username, user.email, user.password, user.full_name])
    .then(() => {
      console.log('User added successfully!');
    })
    .catch(error => {
      console.error('Error adding user: ', error);
      throw error;
    });
}; */

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log(req.body)
  const randomUserID = generateRandomString();
  const { username, email, password } = req.body;
  const newUser = {
    id: randomUserID,
    username,
    email,
    password,
  };

  if (!username || !email || !password) {
    return res.status(400).send("Error: name, email, and password is required");
  }

  if (getUserIDByEmail(email, users)) {
    return res.status(404).send("User already exists");
  }

  users[newUser.id] = newUser;
  res.session("user_id", randomUserID);
  res.session("user_email", email);

  console.log(newUser)

  res.redirect("/f/feeds");
});


module.exports = router;

