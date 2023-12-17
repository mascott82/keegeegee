const db = require('../connection');

const getFeeds = () => {
  return db.query('SELECT * FROM item_listing;')
    .then(data => {
      return data.rows;
    });
};

const addFeed = (feed) => {
  return db.query(`INSERT INTO item_listing (title, description, price, image_url, is_available, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)`,
  [feed.title, feed.description, feed.price, feed.image_url, feed.is_available, feed.user_id])
    .then(() => {
      console.log('Item added successfully!');
    })
    .catch(error => {
      console.error('Error adding item: ', error);
      throw error;
    });
};

const deleteFeed = (id) => {
  return db.query(`DELETE FROM item_listing WHERE id = $1`,
    [id])
    .then(() => {
      console.log('Item deleted successfully!');
    })
    .catch(error => {
      console.log('Error deleting item: ', error);
      throw error;
    });
};

const updateFeedAvailability = (id, isAvailable) => {
  return db.query(`UPDATE item_list SET is_available = $1`,
    [isAvailable])
    .then(data => {
      console.log('Item was marked successfully!');
      return data.rows;
    })
    .catch(error => {
      console.log('Error updating item: ', error);
      throw error;
    });
};

module.exports = { getFeeds, addFeed, deleteFeed, updateFeedAvailability };
