import { Request, Response } from 'express';
import * as podcastServices from '../../services/podcasts/podcasts.channels.services';
import { PodcastChannelInterface } from '../../models/podcasts/podcasts.channels.model';
import { getStatusFromError, formatError } from '../../utils/errors.utils';

export async function postPodcastChannel(req: Request, res: Response) {
    try {
        const payload: PodcastChannelInterface = req.body;
        const response = await podcastServices.postNewPodcastChannel(payload);
        const podcastChannelId = response;
        res.status(201).send({ id: podcastChannelId });
    } catch (error: any) {
        console.log(`postPodcastChannel Service|Error creating Podcast Channel req|${req}`);
        const status = getStatusFromError(error);
        const formattedError = formatError(status, error.message);
        res.status(status).send(formattedError);
    }
}

export async function getPodcastChannel(req: Request, res: Response) {
    try {
        const payload = req.params.podcastChannelId;
        const response = await podcastServices.getPodcastChannel(payload);

        res.status(200).send(response);
    } catch (error: any) {
        console.log(`getPodcastChannel Service|Error fetching podcast|${error}`);
        const status = getStatusFromError(error);
        const formattedError = formatError(status, error.message);
        res.status(status).send(formattedError);
    }
}

export async function getPodcastChannelByUserId(req: Request, res: Response) {
    try {
        const payload = req.params.userId;
        const response = await podcastServices.getPodcastChannelByUser(payload);

        res.status(200).send(response);
    } catch (error: any) {
        console.log(`getPodcastChannel Service|Error fetching podcast|${error}`);
        const status = getStatusFromError(error);
        const formattedError = formatError(status, error.message);
        res.status(status).send(formattedError);
    }
}

export async function getNarrationsByPodcastChannelId(req: Request, res: Response) {
    try {
        const payload = req.params.podcastChannelId;
        const response = await podcastServices.getAllNarrationsByChannel(payload);

        res.status(200).send(response);
    } catch (error: any) {
        console.log(`getPodcastChannel Service|Error fetching podcast|${error}`);
        const status = getStatusFromError(error);
        const formattedError = formatError(status, error.message);
        res.status(status).send(formattedError);
    }
}
