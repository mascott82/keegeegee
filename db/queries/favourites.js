const db = require('../connection');

const getFavourites = () => {
  return db.query(`SELECT * FROM favourites`)
    .then(data => {
      return data.rows;
    });
};

const getFavouritesByUser = (id) => {
  return db.query(`SELECT * FROM favourites WHERE user_id = $1`,
    [id])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error('Error fetching items: ', error);
      throw error;
    });
};

const addFavourite = (favourite) => {
  return db.query(`INSERT INTO favourites (user_id, item_listing_id)
      VALUES ($1, $2)`,
  [favourite.userId, favourite.itemId])
    .then(() => {
      console.log('Favourite item added successfully!');
    })
    .catch(error => {
      console.error('Error adding favourite item: ', error);
      throw error;
    });
};

module.exports = { getFavourites, getFavouritesByUser, addFavourite };
