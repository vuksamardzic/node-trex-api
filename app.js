var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var boards = require('./models/boards.model');
mongoose.connect('mongodb://vs:12345@ds117070.mlab.com:17070/trex');

var db = mongoose.connection;
app.use(cors());

app.get('/', function(req, res) {
  res.send(process.env);
});

app.get('/api/v1/boards', (req, res) => {
  boards.getBoards((err, data) => {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

app.listen(process.env.PORT || 3000);