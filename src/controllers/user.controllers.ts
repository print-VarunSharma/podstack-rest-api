import * as userServces from '../services/user.services';
import { formatError, getStatusFromError } from '../utils/errors.utils';
import { Request, Response } from 'express';
import { UserInterface } from '../models/user.model';

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    let user: UserInterface;

    try {
        user = await userServces.findById(userId);
        res.status(200).json(user);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
