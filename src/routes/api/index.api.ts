import express, { Application, Request, Response } from 'express';
import V1Router from './v1/index.v1';
export const apiRouter = express.Router();

apiRouter.use('/v1', V1Router);

export default apiRouter;
