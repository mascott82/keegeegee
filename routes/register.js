const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
const { getUsers, addUser, loginUser } = require('../db/queries/users')

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  const newUser = {
    username,
    email,
    password,
  };

  if(!username || !email || !password) {
    return res.status(400).send("Error: username, email, and password is required to register");
  }

  users.getUsers()
  .then((data) => {
    const userWithEmail = data.find((user) => user.email === email);

    if (userWithEmail) {
      return res.status(404).send("User already exists");
    }

    // console.log("NEW USER: ", newUser)
    addUser(newUser)
    console.log("DATA: ", data)

    res.redirect("/f/feeds");

  })
  .catch(error => {
    console.error('Error searching user: ', error);
  });

});


module.exports = router;

