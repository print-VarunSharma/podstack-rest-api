import { Request, Response } from 'express';
import { PodcastEpisodeInterface } from 'src/models/podcasts/podcasts.episode.model';
import * as podcastEpisodesService from '../../services/podcasts/podcasts.episodes.services';
import { formatError, getStatusFromError } from '../../utils/errors.utils';

export const getPodcastEpisode = async (req: Request, res: Response) => {
    const episodeId = req.params.episodeId;
    let episode;

    try {
        episode = await podcastEpisodesService.findById(episodeId);

        res.status(200).json(episode);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);

        res.status(status).send(formattedError);
    }
};

export const postPodcastEpisode = async (req: Request, res: Response) => {
    try {
        const payload: PodcastEpisodeInterface = req.body;
        const podcastEpisodeId = await podcastEpisodesService.postNewPodcastEpisode(payload);

        res.status(201).send({ id: podcastEpisodeId });
    } catch (error: unknown) {
        console.log(`postPodcastChannel|Error creating Podcast Channel req|${req}`);
        res.status(400).send({ msg: `error posting ${error}` });
    }
};

export const getAllPodcastEpisodesByChannel = async (req: Request, res: Response) => {
    const podcastChannelId = req.params.podcastChannelId;
    console.log(`podcastChannel ID is ${podcastChannelId}`);
    let podcastEpisodes;

    try {
        podcastEpisodes = await podcastEpisodesService.findAllByChannelId(podcastChannelId);

        res.status(200).json(podcastEpisodes);
    } catch (e: any) {
        const status = getStatusFromError(e);
        const formattedError = formatError(status, e.message);

        res.status(status).send(formattedError);
    }
};
