-- Drop and recreate item_listing table

DROP TABLE IF EXISTS item_listing CASCADE;
CREATE TABLE item_listing (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  image_url VARCHAR(255),
  description TEXT,
  is_available BOOLEAN,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCASE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
