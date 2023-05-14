import express from 'express';
import validateSchema from '../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../types/schema/schema.constants';
import * as projectController from '../../../../controllers/project.controllers';
const ProjectRouter = express.Router({ mergeParams: true });

ProjectRouter.get('/:projectId', projectController.getProject);
ProjectRouter.patch('/:projectId', projectController.patch);
ProjectRouter.delete('/:projectId', projectController.deleteProject);
ProjectRouter.get('/groups/:groupId', projectController.getAllProjects);
ProjectRouter.post('/groups/:groupId', validateSchema(SCHEMA_NAMES.PROJECTS_POST), projectController.post);
export default ProjectRouter;
