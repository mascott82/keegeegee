-- Drop and recreate messages table

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  from_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  to_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content text,
  pid INTEGER,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
