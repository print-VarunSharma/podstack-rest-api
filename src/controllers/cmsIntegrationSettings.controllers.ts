import * as cmsIntegrationSettingsServices from '../services/cmsIntegrationSettings.services';
import { formatError, getStatusFromError } from '../utils/errors.utils';
import { Request, Response } from 'express';

export const getCmsIntegrationSetting = async (req: Request, res: Response) => {
    const cmsIntegrationSettingsId = req.params.cmsIntegrationSettingsId;
    let cmsIntegrationSettings;

    try {
        cmsIntegrationSettings = await cmsIntegrationSettingsServices.findById(cmsIntegrationSettingsId);
        res.status(200).json(cmsIntegrationSettings);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);

        res.status(status).send(formattedError);
    }
};

export const getAllCmsIntegrationSettings = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    let cmsIntegrationSettings;

    try {
        cmsIntegrationSettings = await cmsIntegrationSettingsServices.findAll(projectId);
        console.log(`Returning ${cmsIntegrationSettings.length} cmsIntegrationSettings`);

        res.status(200).json(cmsIntegrationSettings);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const post = async (req: Request, res: Response) => {
    const createObj = req.body;

    const projectId = req.params.projectId;
    let cmsIntegrationSettings;

    try {
        cmsIntegrationSettings = await cmsIntegrationSettingsServices.create(projectId, createObj);
        res.status(201).json({ id: cmsIntegrationSettings.id });
    } catch (e: any) {
        console.error(e);
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const patch = async (req: Request, res: Response) => {
    const cmsIntegrationSettingsId = req.params.cmsIntegrationSettingsId;
    const updateObj = req.body;
    let updatedCmsNarrationSettings;

    try {
        updatedCmsNarrationSettings = await cmsIntegrationSettingsServices.update(cmsIntegrationSettingsId, updateObj);
        res.status(200).json({ id: updatedCmsNarrationSettings });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const deleteCmsIntegrationSetting = async (req: Request, res: Response) => {
    const cmsIntegrationSettingsId = req.params.cmsIntegrationSettingsId;

    try {
        await cmsIntegrationSettingsServices.deleteById(cmsIntegrationSettingsId);
        res.status(200).send({ id: cmsIntegrationSettingsId, status: 'deleted' });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
