import { firestore } from 'firebase-admin';
import { DocumentVersionType, FirestoreDocumentId, FirestoreTimestampType } from 'src/types/types';
export interface PodcastEpisodeInterface {
    id?: FirestoreDocumentId;
    channelId: string | null;
    narrationId: string | null;
    creationDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    version: DocumentVersionType | null;
}

export const DEFAULT_PODCAST_EPISODE_VALUES: any = {
    channelId: null,
    narrationId: null,
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1
};
