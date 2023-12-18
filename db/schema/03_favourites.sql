-- Drop and recreate favourites table

DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCASE,
  item_listing_id INTEGER REFERENCES item_listing(id) ON DELETE CASCASE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
