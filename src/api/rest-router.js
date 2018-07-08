import express from 'express';
import { boardRouter } from './resources/board/board.router';
import { listRouter } from './resources/list/list.router';
import { cardRouter } from './resources/card/card.router';
import { apiErrorHandler } from './modules/error-handler';


export const restRouter = express.Router({});

restRouter.use('/board', boardRouter);
restRouter.use('/list', listRouter);
restRouter.use('/card', cardRouter);
restRouter.use(apiErrorHandler);
