import * as narrationServices from '../services/narration.services';
import { formatError, getStatusFromError } from '../utils/errors.utils';
import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';

export const getNarration = async (req: Request, res: Response) => {
    const narrationId = req.params.narrationId;
    let narration;

    try {
        narration = await narrationServices.findById(narrationId);
        res.status(200).json(narration);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);

        res.status(status).send(formattedError);
    }
};

export const getAllNarrations = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 25;

    let narrations;

    try {
        narrations = await narrationServices.findAll(userId, offset as number, limit as number);
        console.log(`Returning ${narrations.length} narrations`);

        res.status(200).json(narrations);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const getNarrationsByWhatsappNumber = async (req: Request, res: Response) => {
    const phoneNumber = req.params.phoneNumber;

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 100;

    let narrations;

    try {
        narrations = await narrationServices.findAllByWhatsappNumber(phoneNumber, offset as number, limit as number);
        console.log(`Returning ${narrations.length} narrations`);

        res.status(200).json(narrations);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const post = async (req: Request, res: Response) => {
    const createObj = req.body;

    // convert the UTC date string into firestores needed Timstamp format
    createObj.publishDate = firestore.Timestamp.fromDate(new Date(createObj.publishDate));

    const userId = req.params.userId;
    let narration;

    try {
        narration = await narrationServices.create(userId, createObj);
        res.status(201).json({ id: narration.id });
    } catch (e: any) {
        console.error(e);
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const patch = async (req: Request, res: Response) => {
    const narrationId = req.params.narrationId;
    const updateObj = req.body;
    let updatedNarrationId;

    try {
        updatedNarrationId = await narrationServices.update(narrationId, updateObj);
        res.status(200).json({ id: updatedNarrationId });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const deleteNarration = async (req: Request, res: Response) => {
    const narrationId = req.params.narrationId;

    try {
        await narrationServices.deleteById(narrationId);
        res.status(200).send({ id: narrationId, status: 'deleted' });
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};

export const getEntireCollection = async (req: Request, res: Response) => {
    let narrations;

    try {
        narrations = await narrationServices.findEntireCollection();
        console.log(`Returning ${narrations.length} narrations`);

        res.status(200).json(narrations);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);
        res.status(status).send(formattedError);
    }
};
