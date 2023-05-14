import express from 'express';
import * as userController from '../../../../controllers/user.controllers';

const UserRouter = express.Router({ mergeParams: true });

UserRouter.get('/:userId', userController.getUser);

export default UserRouter;
