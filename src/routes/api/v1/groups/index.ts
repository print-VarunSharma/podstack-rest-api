import { Router } from 'express';
import validateSchema from '../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../types/schema/schema.constants';
import * as groupsController from '../../../../controllers/groups.controllers';

const groupsRouter = Router({ mergeParams: true });

groupsRouter.get('/:groupId', groupsController.getGroup);
groupsRouter.get('/', groupsController.getGroups);
groupsRouter.post('/', validateSchema(SCHEMA_NAMES.GROUPS_POST), groupsController.postGroup);

export default groupsRouter;
