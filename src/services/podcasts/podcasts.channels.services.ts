import * as podcastChannelDaos from '../../daos/podcasts/podcasts.channels.daos';
import * as errors from '../../constants/errors.constants';
import { PodcastChannelInterface, defaultPodcastChannelValues, isValidPodcastChannelType } from '../../models/podcasts/podcasts.channels.model';
import { NarrationInterface } from 'src/models/narration.model';

export const postNewPodcastChannel = async (payload: PodcastChannelInterface): Promise<string> => {
    try {
        // TODO - rethink to maybe setting this into a class
        const podcastChannel: PodcastChannelInterface = {
            ...defaultPodcastChannelValues,
            userId: payload.userId
        };

        const newId = await podcastChannelDaos.createPodcastChannel(podcastChannel);
        return newId;
    } catch (error) {
        console.error(`PodcastsServices|Error posting PodcastChannel ${error}`);
        throw error;
    }
};

export const getPodcastChannel = async (podcastChannelId: string): Promise<PodcastChannelInterface> => {
    try {
        const data = await podcastChannelDaos.getPodcastChannelById(podcastChannelId);

        if (!data) {
            throw new Error(errors.contentDoesNotExist);
        }

        if (!isValidPodcastChannelType(data)) {
            console.error(`getPodcastChannel|Unexpected data returned from database|${data}`);
            throw new Error(errors.genericDatabaseError);
        }

        return data;
    } catch (error) {
        console.error(`PodcastsServices|Error fetching Podcast channel|${error}`);
        throw error;
    }
};

export const getPodcastChannelByUser = async (userId: string): Promise<PodcastChannelInterface[]> => {
    try {
        const data = await podcastChannelDaos.getPodcastChannelByUserId(userId);

        if (!data || data.length === 0) {
            throw new Error(errors.contentDoesNotExist);
        }

        return data;
    } catch (error) {
        console.error(`PodcastsServices|Error fetching Podcast channel|${error}`);
        throw error;
    }
};

export const getAllNarrationsByChannel = async (podcastChannelId: string): Promise<NarrationInterface[]> => {
    try {
        const data = await podcastChannelDaos.getAllNarrationsByChannelId(podcastChannelId);

        if (!data) {
            throw new Error(errors.contentDoesNotExist);
        }

        return data;
    } catch (error) {
        console.error(`PodcastsServices|Error fetching Podcast channel|${error}`);
        throw error;
    }
};
