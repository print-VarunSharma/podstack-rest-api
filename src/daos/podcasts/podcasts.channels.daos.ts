import { isValidPodcastChannelType, PodcastChannelInterface } from '../../models/podcasts/podcasts.channels.model';
import { firestoreDatabase } from '../../config/firebase/firebase';
import * as errors from '../../constants/errors.constants';
import { NarrationInterface } from '../../models/narration.model';
import { FirestoreTimestampType } from '../../types/types';

export const createPodcastChannel = async (podcast: PodcastChannelInterface): Promise<string> => {
    try {
        const newEntry = await firestoreDatabase.collection('PodcastChannel').add(podcast);

        console.log(`createPodcastChannelDao|added new entry with ${newEntry.id}`);

        return newEntry.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPodcastChannelById = async (podcastChannelId: string): Promise<PodcastChannelInterface> => {
    try {
        const snapShotDocument = await firestoreDatabase.collection('PodcastChannel').doc(podcastChannelId).get();
        const podcastChannel = snapShotDocument.data() as PodcastChannelInterface;

        if (podcastChannel) {
            podcastChannel.id = snapShotDocument.id;
        }
        return podcastChannel;
    } catch (error) {
        console.log('getPodcastChannelById|Error fetching entry');
        throw error;
    }
};

export const getPodcastChannelByUserId = async (userId: string): Promise<PodcastChannelInterface[]> => {
    try {
        const snapshot = await firestoreDatabase.collection('PodcastChannel').where('userId', '==', userId).get();
        const data: PodcastChannelInterface[] = snapshot.docs.map((channel) => {
            const podcastChannel = channel.data() as PodcastChannelInterface;

            if (!isValidPodcastChannelType(podcastChannel)) {
                console.log(`getPodcastChannelByUserId|Unexpected data returned from database|${data}`);
                throw new Error(errors.genericDatabaseError);
            }

            if (podcastChannel) {
                podcastChannel.id = channel.id;
            }

            return podcastChannel;
        });

        return data;
    } catch (error) {
        console.log('getPodcastChannelByUserId|Error fetching entry');
        throw error;
    }
};

export const getAllNarrationsByChannelId = async (podcastChannelId: string): Promise<NarrationInterface[]> => {
    try {
        const narrationsCollectionSnapshot = await firestoreDatabase.collection('Narrations').where('podcastChannelId', '==', podcastChannelId).get();

        let narrationsList: any[] = [];

        const narrations = narrationsCollectionSnapshot.docs.map((narration) => {
            narrationsList.push({
                id: narration.id,
                ...narration.data()
            });
        });

        return narrationsList as unknown as NarrationInterface[];
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};
