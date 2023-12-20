const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
const { getUsers, addUser, loginUser } = require('../db/queries/users')

router.get('/', (req, res) => {
  users.getUsers()
    .then(data => {
      const templateVars = { username: req.session.username, userId: req.session.userId, data }

      if(req.session.userId) {
        return res.redirect("/f/feeds")
      }

      res.render('register', templateVars);
    })
});

router.post('/', (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  const newUser = {
    username,
    email,
    password,
  };

  if (!username || !email || !password) {
    return res.status(400).send("Error: username, email, and password is required to register");
  }

  users.getUsers()
    .then((data) => {
      const userWithEmail = data.find((user) => user.email === email);

      if (userWithEmail) {
        return res.status(404).send("User already exists");
      }

      addUser(newUser)

      res.redirect("/f/feeds");

    })
    .catch(error => {
      console.error('Error searching user: ', error);
    });

});


module.exports = router;

