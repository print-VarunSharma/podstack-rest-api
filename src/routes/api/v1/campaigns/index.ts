import express from 'express';
import * as campaignsController from '../../../../controllers/campaigns.controllers';
const CampaignsRouter = express.Router({ mergeParams: true });

CampaignsRouter.get('/name/:campaignName', campaignsController.getContentByCampaignName);

export default CampaignsRouter;
