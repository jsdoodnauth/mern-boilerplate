const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const app = express();
app.use(cors());
const router = express.Router();


/**
 * Middleware - Mongoose
 * Connect to the database
 */
mongoose.connect(
  config.MONGODB_URI, { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', () => console.error.bind(console, 'MongoDB connection error: '));

/**
 * Application Routes
 */
require('./routes')(app);

/**
 * Start the server and listen for requests
 */
app.use(express.static(path.join(__dirname, '../client/build')));
app.listen(config.PORT, () => console.log(`App is listening on port ${config.PORT}`));
app.get('/', (req, res) => res.send('Hello there'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
