import express from 'express';
import { boardRouter } from './resources/board/board.router';
import { apiErrorHandler } from './modules/error-handler';
import { listRouter } from './resources/list/list.router';

export const restRouter = express.Router({});

restRouter.use('/board', boardRouter);
restRouter.use('/list', listRouter);
restRouter.use(apiErrorHandler);
