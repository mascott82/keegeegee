// load .env data into process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  name: "session",
  secret: ["cheese", "chicken", "capybara"]
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const feedsRoutes = require('./routes/feeds');
const favoritesRoutes = require('./routes/favorites');
const searchRoutes = require('./routes/search');
const searchApiRoutes = require('./routes/search-api');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const feedsApiRoutes = require('./routes/feeds-api');
const favoritesApiRoutes = require('./routes/favorites-api');
const messageApiRoutes = require('./routes/message-api');
const messageRoutes = require('./routes/message');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/f', feedsRoutes);
app.use('/fav', favoritesRoutes);
app.use('/s', searchRoutes);
app.use('/api/search', searchApiRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/api/feeds', feedsApiRoutes);
app.use('/api/fav', favoritesApiRoutes);
app.use('/api/msg', messageApiRoutes);
app.use('/m', messageRoutes);
app.use('/logout', logoutRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.redirect('/f/feeds');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

