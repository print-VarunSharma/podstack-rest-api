import * as NarationDao from '../daos/narration.daos';
import * as errorMessages from '../constants/errors.constants';
import { firestore } from 'firebase-admin';
import { DEFAULT_NARRATION_VALUES, NarrationInterface } from '../models/narration.model';

export const findById = async (id: string): Promise<NarrationInterface> => {
    let narration;

    try {
        narration = await NarationDao.getById(id);

        if (narration) {
            return narration;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const findAll = async (userId: string, offset: number, limit: number) => {
    let userNarrations;

    try {
        userNarrations = await NarationDao.getAll(userId, offset, limit);

        if (userNarrations) {
            return userNarrations;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const findAllByWhatsappNumber = async (phoneNumber: string, offset: number, limit: number) => {
    let narrations;

    try {
        narrations = await NarationDao.getAllByWhatsappNumber(phoneNumber, offset, limit);

        if (narrations) {
            return narrations;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const create = async (userId: string, creationObj: any) => {
    let narrationSetting;

    creationObj = { userId: userId, ...creationObj };

    const narration: NarrationInterface = {
        ...creationObj,
        ...DEFAULT_NARRATION_VALUES
    };
    try {
        narrationSetting = await NarationDao.create(narration);

        if (narrationSetting) {
            return narrationSetting;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const update = async (userId: string, updateObj: any): Promise<string> => {
    let narration;

    // ! Github issue that explains an issue that arose, which lead to these timestamp modifications: https://github.com/Ad-Auris/play_slack_app/issues/32
    // * make sure creationDate is never modified by a patch
    if ('creationDate' in updateObj) {
        delete updateObj.creationDate;
    }
    // * make sure publishDate is never modified by a patch since the formatting breaks when pulling a firestore timestamp and reuploading
    if ('publishDate' in updateObj) {
        delete updateObj.publishDate;
    }
    // * always update modifiedDate when modifying the document
    updateObj.modifiedDate = firestore.FieldValue.serverTimestamp();

    try {
        narration = await NarationDao.updateById(userId, updateObj);

        if (narration) {
            return narration;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const deleteById = async (narrationId: string): Promise<void> => {
    try {
        await NarationDao.deleteById(narrationId);
        return;
    } catch (e) {
        throw e;
    }
};

export const findEntireCollection = async () => {
    let userNarrations;

    try {
        userNarrations = await NarationDao.getEntireCollection();

        if (userNarrations) {
            return userNarrations;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};
