const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const addUser = (user) => {
  return db.query(`INSERT INTO users (username, email, password, full_name)
      VALUES ($1, $2, $3, $4)`,
  [user.username, user.email, user.password, user.full_name])
    .then(() => {
      console.log('User added successfully!');
    })
    .catch(error => {
      console.error('Error adding user: ', error);
      throw error;
    });
};

const loginUser = (email, password) => {
  return db.query(`SELECT * FROM users WHERE email = $1 and password = $2`,
    [email, password])
    .then(() => {
      console.log('User logon successfully!');
    })
    .catch(error => {
      console.error('Error searching user: ', error);
      throw error;
    });
};

const getUserIDByEmail = (email, users) => {
  for (let userID in users) {
    if (users.email === email) {
      return user.id;
    }
  }
  return false;
};

module.exports = { getUsers, addUser, loginUser, getUserIDByEmail };
