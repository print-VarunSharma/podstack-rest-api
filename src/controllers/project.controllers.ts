import * as projectServices from '../services/project.services';
import { formatError, getStatusFromError } from '../utils/errors.utils';
import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';

export const getProject = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    let narration;

    try {
        narration = await projectServices.findById(projectId);
        res.status(200).json(narration);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);

        res.status(status).send(formattedError);
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 25;

    let projects;

    try {
        projects = await projectServices.findAll(groupId, offset as number, limit as number);
        console.log(`Returning ${projects.length} projects`);

        res.status(200).json(projects);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const post = async (req: Request, res: Response) => {
    const createObj = req.body;

    const groupId = req.params.groupId;
    let project;

    try {
        project = await projectServices.create(groupId, createObj);
        res.status(201).json({ id: project.id });
    } catch (e: any) {
        console.error(e);
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const patch = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const updateObj = req.body;
    let updatedProjectId;

    try {
        updatedProjectId = await projectServices.update(projectId, updateObj);
        res.status(200).json({ id: updatedProjectId });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    try {
        await projectServices.deleteById(projectId);
        res.status(200).send({ id: projectId, status: 'deleted' });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
