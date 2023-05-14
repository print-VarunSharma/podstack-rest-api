import { firestoreDatabase } from '../config/firebase/firebase';
import { CmsIntegrationSettingsInterface } from '../models/cmsIntegrationSettings.model';

const collectionName = 'CmsIntegrationsSettings';

export const getById = async (id: string): Promise<CmsIntegrationSettingsInterface> => {
    try {
        const CmsIntegrationSettingsDocument = await firestoreDatabase.collection(collectionName).doc(id).get();

        const CmsIntegrationSettings = CmsIntegrationSettingsDocument.data() as CmsIntegrationSettingsInterface;

        if (CmsIntegrationSettings) {
            CmsIntegrationSettings.id = CmsIntegrationSettingsDocument.id;
        }

        return CmsIntegrationSettings;
    } catch (error) {
        console.log('Error fetching CmsIntegrationSettings data:', error);
        throw error;
    }
};

export const getAll = async (projectId: string): Promise<CmsIntegrationSettingsInterface[]> => {
    try {
        let CmsIntegrationSettingsList: any[] = [];
        const CmsIntegrationSettingsCollectionSnapshot = await firestoreDatabase
            .collection(collectionName)
            .where('projectId', '==', projectId)
            .orderBy('creationDate', 'desc')
            .get();
        // Documentation on offset + limit queries via Firestore: https://googleapis.dev/nodejs/firestore/latest/Query.html#offset

        const CmsIntegrationSettings = CmsIntegrationSettingsCollectionSnapshot.docs.map((CmsIntegrationSettings) => {
            CmsIntegrationSettingsList.push({
                id: CmsIntegrationSettings.id,
                ...CmsIntegrationSettings.data()
            });
        });

        return CmsIntegrationSettingsList as CmsIntegrationSettingsInterface[];
    } catch (error) {
        console.log('Error fetching CmsIntegrationSettings data:', error);
        throw error;
    }
};

export const create = async (CmsIntegrationSettingsData: CmsIntegrationSettingsInterface): Promise<CmsIntegrationSettingsInterface | void> => {
    try {
        const createdCmsIntegrationSettings = await firestoreDatabase.collection(collectionName).add(CmsIntegrationSettingsData);
        console.log('Added document with ID: ', createdCmsIntegrationSettings.id);

        // add the created id to the input data, and return the CmsIntegrationSettings
        Object.assign(CmsIntegrationSettingsData, { id: createdCmsIntegrationSettings.id });

        return CmsIntegrationSettingsData;
    } catch (error) {
        console.log('Error fetching CmsIntegrationSettings data:', error);
        throw error;
    }
};

export const updateById = async (id: string, data: object): Promise<string> => {
    try {
        const CmsIntegrationSettingsDocument = await firestoreDatabase.collection(collectionName).doc(id).update(data);
        return id;
    } catch (error) {
        console.log('Error fetching CmsIntegrationSettings data:', error);
        throw error;
    }
};

export const deleteById = async (id: string): Promise<void> => {
    try {
        await firestoreDatabase.collection(collectionName).doc(id).delete({ exists: true });
        return;
    } catch (error) {
        console.log('Error deleting CmsIntegrationSettings:', error);
        throw error;
    }
};
