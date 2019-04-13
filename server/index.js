const express = require('express');
const config = require('./config');

const app = express();

app.get('/', (req, res) => res.send('Hello there'));

app.listen(config.PORT, () => (`App is listening on port ${config.PORT}`));