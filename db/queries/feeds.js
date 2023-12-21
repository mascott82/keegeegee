const db = require('../connection');

const getFeeds = () => {
  const querySql = `
    SELECT il.*, u.username AS username, u.email AS email, u.phone_number AS phone_number
    FROM item_listing AS il
    INNER JOIN users AS u ON u.id = il.user_id
    ORDER BY created_at DESC
  `;

  // return db.query('SELECT * FROM item_listing ORDER BY created_at DESC')
  return db.query(querySql)
    .then(data => {
      return data.rows;
    });
};

const getFeedsByUser = (userId) => {
  const querySql = `
    SELECT il.*, u.username AS username, u.email AS email, u.phone_number AS phone_number
    FROM item_listing AS il
    INNER JOIN users AS u ON u.id = il.user_id
    WHERE u.id = $1
    ORDER BY il.created_at DESC
  `;

  return db.query(querySql, [userId])
    .then(data => {
      return data.rows;
    });
};

const getFeedsByPrice = (minPrice, maxPrice) => {
  let query = `
    SELECT il.*, u.username AS username, u.email AS email, u.phone_number AS phone_number
    FROM item_listing AS il
    INNER JOIN users AS u ON u.id = il.user_id
  `;
  let params = [];
  if (minPrice !== null && minPrice !== 'undefined' && minPrice !== '') {
    query += ' WHERE il.price >= $1';
    params.push(minPrice);
    if (maxPrice !== null && maxPrice !== 'undefined' && maxPrice !== '') {
      query += ' AND il.price <= $2';
      params.push(maxPrice);
    }
  } else {
    if (maxPrice !== null && maxPrice !== 'undefined' && maxPrice !== '') {
      query += ' WHERE il.price <= $1';
      params.push(maxPrice);
    }
  }
  query += ' ORDER BY il.created_at DESC';

  return db.query(query, params)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error('Error fetching item: ', error);
      throw error;
    });
};

const addFeed = (feed) => {
  return db.query(`INSERT INTO item_listing (title, description, price, image_url, is_available, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)`,
  [feed.title, feed.desc, feed.price, feed.imageUrl, feed.isAvailable, feed.userId])
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
  return db.query(`UPDATE item_listing SET is_available = $1 WHERE id = $2`,
    [isAvailable, id])
    .then(data => {
      console.log('Item was marked successfully!');
      return data.rows;
    })
    .catch(error => {
      console.log('Error updating item: ', error);
      throw error;
    });
};

module.exports = { getFeeds, getFeedsByPrice, getFeedsByUser, addFeed, deleteFeed, updateFeedAvailability };
