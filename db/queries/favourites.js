const db = require('../connection');
const ROWLIMIT = 1;  // this is default row limit for the first favorite showing, TODO: please change this properly, such as 10 or 20
const getFavourites = async function(_userid, _rowLimit = ROWLIMIT) {
  console.log("_userid, _rowLimit");
  console.log(_userid, _rowLimit);
  // status is currently set as hard-coded = "active", TODO: add status to items table or status table.
  let _qryString =
  `With fav as (SELECT * from favourites WHERE user_id = ${_userid})
  SELECT
  a.id,
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
  a.user_id = c.id
  ORDER BY a.id desc
  LIMIT ${_rowLimit}`;
  console.log(_qryString);
  try {
    const data = await db.query(_qryString);
    console.log("datavalue", data.rows);
    return data.rows;
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw error;
  }
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

const getFavouriteByUserIdAndItemId = (userId, itemId) => {
  const querySql = `
    SELECT * FROM favourites WHERE user_id = $1 AND item_listing_id = $2
  `;
  return db.query(querySql, [userId, itemId])
    .then((data) => {
      console.log("Favourite item found successfully!", data);
      return data.rows;
    })
    .catch(err => {
      console.error('Error in deleting favorite row', err); throw err;
    });
};

module.exports = { getFavourites, addFavourite, deleteFavourite, getFavouriteByUserIdAndItemId };
