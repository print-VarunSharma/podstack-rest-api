import { FirestoreTimestampType } from 'src/types/types';
import { firestoreDatabase } from '../../config/firebase/firebase';
import { PodcastEpisodeInterface } from '../../models/podcasts/podcasts.episode.model';

export const getById = async (episodeId: string): Promise<PodcastEpisodeInterface> => {
    try {
        const podcastEpisodeDocument = await firestoreDatabase.collection('PodcastEpisodes').doc(episodeId).get();
        const episode = podcastEpisodeDocument.data() as PodcastEpisodeInterface;

        if (episode) {
            episode.id = podcastEpisodeDocument.id;
        }

        return episode;
    } catch (error) {
        console.log('Error fetching podcast episode data:', error);
        throw error;
    }
};

export const createPodcastEpisode = async (episodeData: PodcastEpisodeInterface): Promise<string> => {
    try {
        const createdEpisode = await firestoreDatabase.collection('PodcastEpisodes').add(episodeData);

        return createdEpisode.id;
    } catch (error) {
        console.log('Error creating podcast episode data:', error);
        throw error;
    }
};

export const getAllEpisodesByChannel = async (channelId: string): Promise<PodcastEpisodeInterface[]> => {
    try {
        const podcastEpisodesSnapshot = await firestoreDatabase.collection('PodcastEpisodes').where('channelId', '==', channelId).get();

        let podcastEpisodesList: any[] = [];

        const podcastEpisodes = podcastEpisodesSnapshot.docs.map((podcastEpisode) => {
            podcastEpisodesList.push({
                id: podcastEpisode.id,
                ...podcastEpisode.data()
            });
        });

        return podcastEpisodesList as PodcastEpisodeInterface[];
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};
