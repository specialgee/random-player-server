require('rootpath')();
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const videoRouter = require('./routes/video-router');
const categoryRouter = require('./routes/category-router');

const apiPort = process.env.PORT || 3000

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// // CORS proxy
// app.post('/api/category', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// connect to mongoDB
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post("/", (req, res) => {
  res.send("POST request");
});

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/api', videoRouter);
app.use('/api', categoryRouter);

// global error handler
const errorHandler = require('helpers/error-handler');
app.use(errorHandler);

// start server
//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// listen for requests
let listener = app.listen(apiPort, () => {
  console.log("Server running on port " + listener.address().port);
});

