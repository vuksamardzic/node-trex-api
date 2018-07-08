import express from 'express';
import { boardController } from './board.contoller';
import { Board } from './board.model';

export const boardRouter = express.Router({});

boardRouter.param('id', boardController(Board).findOne);

boardRouter.route('/')
  .get(boardController(Board).readAll)
  .post(boardController(Board).createOne)
  .delete(boardController(Board).deleteAll);

boardRouter.route('/:id')
  .get(boardController(Board).readOne)
  .put(boardController(Board).updateOne)
  .delete(boardController(Board).deleteOne);
