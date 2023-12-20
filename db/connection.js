// PG database client/connection setup
const { Pool } = require('pg');

// Check the environment to determine whether to use SSL
const useSSL = process.env.NODE_ENV === 'production';

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
