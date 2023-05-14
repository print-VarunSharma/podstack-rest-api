import * as ProjectDao from '../daos/project.daos';
import * as errorMessages from '../constants/errors.constants';
import { firestore } from 'firebase-admin';
import { DEFAULT_PROJECT_VALUES, ProjectInterface } from '../models/project.model';

export const findById = async (id: string): Promise<ProjectInterface> => {
    let project;

    try {
        project = await ProjectDao.getById(id);

        if (project) {
            return project;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const findAll = async (groupId: string, offset: number, limit: number) => {
    let groupProjects;

    try {
        groupProjects = await ProjectDao.getAll(groupId, offset, limit);

        if (groupProjects) {
            return groupProjects;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const create = async (groupId: string, creationObj: any) => {
    let projectSetting;

    creationObj = { groupId: groupId, ...creationObj };

    const project: ProjectInterface = {
        ...creationObj,
        ...DEFAULT_PROJECT_VALUES
    };
    try {
        projectSetting = await ProjectDao.create(project);

        if (projectSetting) {
            return projectSetting;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const update = async (projectId: string, updateObj: any): Promise<string> => {
    let project;

    // ! Github issue that explains an issue that arose, which lead to these timestamp modifications: https://github.com/Ad-Auris/play_slack_app/issues/32
    // * make sure creationDate is never modified by a patch
    if ('creationDate' in updateObj) {
        delete updateObj.creationDate;
    }

    // * always update modifiedDate when modifying the document
    updateObj.modifiedDate = firestore.FieldValue.serverTimestamp();

    try {
        project = await ProjectDao.updateById(projectId, updateObj);

        if (project) {
            return project;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const deleteById = async (projectId: string): Promise<void> => {
    try {
        await ProjectDao.deleteById(projectId);
        return;
    } catch (e) {
        throw e;
    }
};
