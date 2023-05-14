import apiRouter from './api/index.api';
import * as userServices from '../services/user.services';
import { getStatusFromError } from '../utils/errors.utils';
import { Application, Request, Response } from 'express';

export const baseRouter = (app: Application) => {
    app.use('/api', apiRouter);
    app.get('/sanity-check', (_, res: Response) => {
        res.status(200).send({ message: 'https://pbs.twimg.com/media/DrZBFLtXcAAhtwV.jpg' });
    });
    app.get('/healthcheck', async (_, res: Response) => {
        try {
            const testDatabaseConnection = await userServices.findById('HYgool82YrXTF2mekDlqow23hQV2');

            res.status(200).send({
                message: 'Play App API is online',
                status: 200
            });
        } catch (err) {
            console.log(err);
            const eStatus = getStatusFromError(err);
            res.status(200).send({
                message: 'Play App API is offline',
                status: eStatus
            });
        }
    });

    // Default in case of unmatched routes
    app.use((_, res) => {
        res.status(404).json({
            error: {
                name: 'Error',
                message: 'Invalid Request - RESOURCE DOES NOT EXIST'
            }
        });
    });
};
