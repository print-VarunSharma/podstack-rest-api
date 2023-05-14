import * as campaignsService from '../services/campaigns.services';
import { formatError, getStatusFromError } from '../utils/errors.utils';
import { Request, Response } from 'express';

export const getContentByCampaignName = async (req: Request, res: Response) => {
    const campaignName = req.params.campaignName;

    try {
        const campaignContents = await campaignsService.findByCampaignName(campaignName);
        console.log(`Returning ${campaignContents.length} campaign contents`);

        res.status(200).json(campaignContents);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
