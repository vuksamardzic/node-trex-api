import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Board } from './models/boards.model';
import { connect } from './db';

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({ ok: false });
});

app.get('/api/v1/board', (req, res) => {
  Board.find((err, data) => {
    if (err) {
      throw err;
    }
    const _data = data.map(i => {
      return {
        id: i['_id'],
        name: i.name
      };
    });
    res.json(_data);
  });
});

app.post('/api/v1/board', (req, res, next) => {
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
app.listen(port, () => {
  console.log('live on port:', port);
});
