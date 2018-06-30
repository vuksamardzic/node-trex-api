import express from 'express';

export const boardRouter = express.Router();

const exec = () => {
};

boardRouter.param('id', exec());

boardRouter.route('/')
  .get(exec())
  .post(exec());

boardRouter.route('/:id')
  .get(exec())
  .post(exec());