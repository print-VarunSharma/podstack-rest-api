import express, { Application, Request, Response } from 'express';
import { baseRouter } from '../routes/index.routes';

const createServer = () => {
    const app: Application = express();
    app.use(express.json());

    baseRouter(app);
    return app;
};

export default createServer;
