import express from 'express';
import validateSchema from '../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../types/schema/schema.constants';
import * as narrationController from '../../../../controllers/narration.controllers';
const NarrationRouter = express.Router({ mergeParams: true });

NarrationRouter.get('/collection', narrationController.getEntireCollection);
NarrationRouter.get('/:narrationId', narrationController.getNarration);
NarrationRouter.get('/whatsapp/:phoneNumber', narrationController.getNarrationsByWhatsappNumber);
NarrationRouter.patch('/:narrationId', narrationController.patch);
NarrationRouter.delete('/:narrationId', narrationController.deleteNarration);
NarrationRouter.get('/users/:userId', narrationController.getAllNarrations);
NarrationRouter.post('/users/:userId', validateSchema(SCHEMA_NAMES.NARRATIONS_POST), narrationController.post);
export default NarrationRouter;
