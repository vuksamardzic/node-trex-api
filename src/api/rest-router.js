import express from 'express';
import { boardRouter } from './resources/board/board.router';
import { apiErrorHandler } from './modules/error-handler';

export const restRouter = express.Router({});

restRouter.use('/board', boardRouter);
restRouter.use(apiErrorHandler);
