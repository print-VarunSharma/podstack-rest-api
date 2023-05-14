import * as UserDao from '../daos/user.daos';
import * as errorMessages from '../constants/errors.constants';
import { UserInterface } from '../models/user.model';

export const findById = async (id: string): Promise<UserInterface> => {
    let user;

    try {
        user = await UserDao.getById(id);

        if (user) {
            return user;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};
