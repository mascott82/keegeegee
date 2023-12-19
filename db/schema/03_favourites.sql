-- Drop and recreate favourites table

DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL, -- this is autogenerated, just unique identifier mapping between user_id and item_listing_id pair
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_listing_id INTEGER REFERENCES item_listing(id) ON DELETE CASCADE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- timestamp when user's selected listing_id to his or her favorites table
);
