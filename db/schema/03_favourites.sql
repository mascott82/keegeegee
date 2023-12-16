-- Drop and recreate favourites table

DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  item_listing_id INTEGER REFERENCES item_listing(id),
  created_at  TIMESTAMP
);
