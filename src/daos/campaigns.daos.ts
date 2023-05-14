import { firestoreDatabase } from '../config/firebase/firebase';
import { CampaignContentInterface } from '../models/campaigns.model';

export const getByCampaignName = async (campaignName: string): Promise<CampaignContentInterface[]> => {
    try {
        const campaignContentCollectionSnapshot = await firestoreDatabase
            .collection('CampaignContent')
            .where('campaignName', '==', campaignName)
            .where('isEnabled', '==', true)
            .orderBy('creationDate', 'desc')
            .get();

        const campaignContents = campaignContentCollectionSnapshot.docs.map((campaignData) => {
            return {
                id: campaignData.id,
                ...campaignData.data()
            };
        });

        return campaignContents as CampaignContentInterface[];
    } catch (error) {
        console.log('Error fetching campaignContent data:', error);
        throw error;
    }
};
