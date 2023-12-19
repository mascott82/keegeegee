const db = require('../connection');

const getFavourites = (_userid) => {
  // status is currently set as hard-coded = "active", TODO: add status to items table or status table.
  let _qryString =
  `With fav as (SELECT * from favourites WHERE user_id = ${_userid})
  SELECT
  a.user_id,
  a.item_listing_id,
  a.created_at,
  b.title,
  b.price,
  b.description,
  b.image_url,
  CASE WHEN b.is_available THEN 'available' ELSE 'sold' END as status,
  c.username
  FROM fav as a
  INNER JOIN item_listing as b
  ON
  a.item_listing_id = b.id
  AND
  a.user_id = b.user_id
  INNER JOIN users as c
  ON
  a.user_id = c.id`;
  console.log(_qryString);
  return db.query(_qryString)
    .then(data => {
      console.log("datavalue", data.rows);
      return data.rows;  // rows will have id, user_id, item_listing_id, created_at
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


const deleteFavourite = (favId) =>{
  // with the given favId, delete corresponding row from favourites table
  let _deleteQry = `DELETE FROM favourites WHERE id = ${favId};`;  // complete query by using string interpolation
  db.query(_deleteQry)  // db is middle guy and handle with the given query
    .then((data) => {  // db.query is async, need "then" for success case
      console.log("Deleting favorite succeeded", data);
      return data.rows;
    })
    .catch(err => {  // async, need "catch" for fail case
      console.error('Error in deleting favorite row', err); throw err;
    });
};
module.exports = { getFavourites, addFavourite, deleteFavourite };
