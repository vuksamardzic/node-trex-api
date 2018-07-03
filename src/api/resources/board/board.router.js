import express from 'express';
import boardController from './board.contoller';

export const boardRouter = express.Router();

// boardRouter.param('id', boardController.findByParam);

boardRouter.route('/')
  .get(boardController.getAll)
  .post(boardController.createOne);

boardRouter.route('/:id')
  .get(boardController.getOne)
  .put(boardController.updateOne)
  .delete(boardController.deleteOne);
