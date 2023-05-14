import { Request, Response } from 'express';
import { getGroupById, getAllGroups, createGroup } from '../daos/groups.dao';
import { GroupInterface } from '../models/group.model';
import { getStatusFromError, formatError } from '../utils/errors.utils';

export const getGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;

    try {
        const group = await getGroupById(groupId);
        console.log(`Returning group ${group.id}`);

        res.status(200).json(group);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const getGroups = async (req: Request, res: Response) => {
    try {
        const groups = await getAllGroups();
        console.log(`Returning ${groups.length} groups`);

        res.status(200).json(groups);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const postGroup = async (req: Request, res: Response) => {
    const group = req.body as GroupInterface;

    try {
        const newGroupId = await createGroup(group);
        console.log(`Created new group with id ${newGroupId}`);

        res.status(201).json({ id: newGroupId });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
