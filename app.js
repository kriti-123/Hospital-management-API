const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');

app.use(bodyParser.json());

/* route middleware */
app.use('/',require('./routes/api/v1/index'))

module.exports = app;