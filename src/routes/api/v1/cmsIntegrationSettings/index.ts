import express from 'express';
import validateSchema from '../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../types/schema/schema.constants';
import * as cmsIntegrationSettingsControler from '../../../../controllers/cmsIntegrationSettings.controllers';
const CmsIntegrationSettingsRouter = express.Router({ mergeParams: true });

CmsIntegrationSettingsRouter.get('/:cmsIntegrationSettingsId', cmsIntegrationSettingsControler.getCmsIntegrationSetting);
CmsIntegrationSettingsRouter.patch('/:cmsIntegrationSettingsId', cmsIntegrationSettingsControler.patch);
CmsIntegrationSettingsRouter.delete('/:cmsIntegrationSettingsId', cmsIntegrationSettingsControler.deleteCmsIntegrationSetting);
CmsIntegrationSettingsRouter.get('/projects/:projectId', cmsIntegrationSettingsControler.getAllCmsIntegrationSettings);
CmsIntegrationSettingsRouter.post(
    '/projects/:projectId',
    validateSchema(SCHEMA_NAMES.CMS_INTEGRATION_SETTINGS_POST),
    cmsIntegrationSettingsControler.post
);
export default CmsIntegrationSettingsRouter;
