import * as cmsIntegrationSettingsDao from '../daos/cmsIntegrationSettings.daos';
import * as errorMessages from '../constants/errors.constants';
import { firestore } from 'firebase-admin';
import { DEFAULT_DATA_VALUES, CmsIntegrationSettingsInterface } from '../models/cmsIntegrationSettings.model';

export const findById = async (id: string): Promise<CmsIntegrationSettingsInterface> => {
    let cmsIntegrationSettings;

    try {
        cmsIntegrationSettings = await cmsIntegrationSettingsDao.getById(id);

        if (cmsIntegrationSettings) {
            return cmsIntegrationSettings;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const findAll = async (projectId: string) => {
    let CmsIntegrationSettings;

    try {
        CmsIntegrationSettings = await cmsIntegrationSettingsDao.getAll(projectId);

        if (CmsIntegrationSettings) {
            return CmsIntegrationSettings;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const create = async (projectId: string, creationObj: any) => {
    let cmsIntegrationSetting;

    creationObj = { projectId: projectId, ...creationObj };

    const cmsIntegrationSettings: CmsIntegrationSettingsInterface = {
        ...creationObj,
        ...DEFAULT_DATA_VALUES
    };
    try {
        cmsIntegrationSetting = await cmsIntegrationSettingsDao.create(cmsIntegrationSettings);

        if (cmsIntegrationSetting) {
            return cmsIntegrationSetting;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const update = async (projectId: string, updateObj: any): Promise<string> => {
    let cmsIntegrationSettings;

    // ! Github issue that explains an issue that arose, which lead to these timestamp modifications: https://github.com/Ad-Auris/play_slack_app/issues/32
    // * make sure creationDate is never modified by a patch
    if ('creationDate' in updateObj) {
        delete updateObj.creationDate;
    }
    // * always update modifiedDate when modifying the document
    updateObj.modifiedDate = firestore.FieldValue.serverTimestamp();

    try {
        cmsIntegrationSettings = await cmsIntegrationSettingsDao.updateById(projectId, updateObj);

        if (cmsIntegrationSettings) {
            return cmsIntegrationSettings;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const deleteById = async (cmsIntegrationSettingsId: string): Promise<void> => {
    try {
        await cmsIntegrationSettingsDao.deleteById(cmsIntegrationSettingsId);
        return;
    } catch (e) {
        throw e;
    }
};
