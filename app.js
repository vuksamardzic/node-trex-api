const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const boardRouter = express.Router();
boardRouter.get('/', (req, res) => {
  res.json({new: true});
});

boardRouter.get('/new', (req, res) => {
  res.json({newer: true});
});


app.use('/api/v1', boardRouter);
app.get('/', (req, res) => {
  res.json({ok: true});
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});