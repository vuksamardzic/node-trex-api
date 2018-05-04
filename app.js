var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

app.get('/', function(req, res) {
  res.json({ok: true});
});

app.listen(process.env.PORT || 3000);