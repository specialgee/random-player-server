require('rootpath')();
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path');
const cors = require('cors');

const errorHandler = require('helpers/error-handler');

const db = require('./db');
const videoRouter = require('./routes/video-router');

const app = express();
const apiPort = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/api', videoRouter);

// global error handler
app.use(errorHandler);

// start server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));