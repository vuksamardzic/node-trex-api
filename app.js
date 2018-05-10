const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Board = require('./models/boards.model');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://vs:12345@ds117070.mlab.com:17070/trex');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ok: true});
});

app.get('/api/v1/boards', (req, res) => {
  Board.getBoards((err, data) => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

app.post('/api/v1/boards', (req, res, next) => {

  console.log(req.body);
  const board = new Board(req.body);

  board.save((err) => {
    if (err) {
      throw next(err);
    } else {
      res.json(board);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port);