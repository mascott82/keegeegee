const db = require('../connection');

const getMessages = () => {
  return db.query(`SELECT * FROM messages`)
    .then(data => {
      return data.rows;
    });
};

const getMessagesByUser = (id) => {
  return db.query(`SELECT * FROM messages WHERE to_user_id = $1`,
    [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error('Error fetching message: ', error);
      throw error;
    });
};

const addMessage = (message) => {
  return db.query(`INSERT INTO messages (from_user_id, to_user_id, content, pid, created_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
  [message.fromUserId, message.toUserId, message.content, message.pid])
    .then(() => {
      console.log('Message added successfully!');
    })
    .catch(error => {
      console.error('Error adding message: ', error);
      throw error;
    });
};

module.exports = { getMessages, getMessagesByUser, addMessage };
