const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();


/**
 * Middleware - Mongoose
 * Connect to the database
 */
mongoose.set('useCreateIndex', true);
mongoose.connect(
  config.MONGODB_URI, { useNewUrlParser: true }
)
.then(() => console.log("MongoDB successfully connected"))
.catch(error => console.log(error));

let db = mongoose.connection;
db.once('open', () => console.log('Connecting to the database...'));
db.on('error', () => console.error.bind(console, 'MongoDB connection error: '));

/**
 * Middleware - Passport
 * Authentication + JWT
 */

 app.use(passport.initialize());
 require('./config/passport')(passport); 

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
