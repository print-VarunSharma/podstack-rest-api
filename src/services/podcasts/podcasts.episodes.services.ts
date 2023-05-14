import * as PodcastEpisodesDao from '../../daos/podcasts/podcasts.episodes.daos';
import * as errorMessages from '../../constants/errors.constants';
import { DEFAULT_PODCAST_EPISODE_VALUES, PodcastEpisodeInterface } from '../../models/podcasts/podcasts.episode.model';
import { assertAttributesAll } from '../utils.services';

export const findById = async (episodeId: string): Promise<PodcastEpisodeInterface> => {
    let episode;

    try {
        episode = await PodcastEpisodesDao.getById(episodeId);

        if (episode) {
            return episode;
        }

        throw new Error(errorMessages.contentDoesNotExist);
    } catch (e) {
        throw e;
    }
};

export const postNewPodcastEpisode = async (payload: PodcastEpisodeInterface) => {
    const podcastEpisodePayload: PodcastEpisodeInterface = {
        ...DEFAULT_PODCAST_EPISODE_VALUES,
        ...payload
    };

    try {
        const podcastEpisodeId = await PodcastEpisodesDao.createPodcastEpisode(podcastEpisodePayload);

        if (podcastEpisodeId) {
            return podcastEpisodeId;
        }

        throw new Error(errorMessages.invalidUpdateAttribute);
    } catch (e) {
        throw e;
    }
};

export const findAllByChannelId = async (channelId: string): Promise<PodcastEpisodeInterface[]> => {
    let podcastEpisodes;

    try {
        podcastEpisodes = await PodcastEpisodesDao.getAllEpisodesByChannel(channelId);

        if (podcastEpisodes) {
            return podcastEpisodes;
        }

        throw new Error(errorMessages.resourceDoesNotExist);
    } catch (e) {
        throw e;
    }
};
