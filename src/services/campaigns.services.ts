import * as CampaignsDao from '../daos/campaigns.daos';
import * as errorMessages from '../constants/errors.constants';
import { CampaignContentInterface } from '../models/campaigns.model';

export const findByCampaignName = async (campaignName: string): Promise<CampaignContentInterface[]> => {
    try {
        const campaignContents = await CampaignsDao.getByCampaignName(campaignName);

        if (campaignContents.length) {
            return campaignContents;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};
