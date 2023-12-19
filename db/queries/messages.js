const db = require('../connection');

const getMessages = () => {
  return db.query(`SELECT * FROM messages ORDER BY created_at DESC`)
    .then(data => {
      return data.rows;
    });
};

const getMessagesByUser = (id) => {
  return db.query(`SELECT * FROM messages WHERE to_user_id = $1 ORDER BY created_at DESC`,
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
  return db.query(`INSERT INTO messages (from_user_id, to_user_id, item_listing_id, content, pid)
      VALUES ($1, $2, $3, $4, $5)`,
  [message.fromUserId, message.toUserId, message.itemId, message.content, message.pid])
    .then(() => {
      console.log('Message added successfully!');
    })
    .catch(error => {
      console.error('Error adding message: ', error);
      throw error;
    });
};

module.exports = { getMessages, getMessagesByUser, addMessage };
