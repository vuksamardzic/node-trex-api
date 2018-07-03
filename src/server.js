import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from './db';
import { restRouter } from './api/rest-router';

const app = express();
connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ health: true });
});
app.use('/api/v1', restRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('live on port:', port);
});
