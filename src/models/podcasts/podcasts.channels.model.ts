import { firestore } from 'firebase-admin';
import { FirestoreDocumentId, DocumentVersionType, UrlType, FirestoreTimestampType } from '../../types/types';

export interface PodcastChannelInterface {
    id?: FirestoreDocumentId;
    userId: string | null;
    author: string | null;
    category1: string | null;
    category2: string | null;
    copyright: string | null;
    coverArt: UrlType | null;
    creationDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    description: string | null;
    email: string | null;
    explicit: string | null;
    language: string | null;
    site: UrlType | null;
    title: string | null;
    version: DocumentVersionType | null;
}

export const defaultPodcastChannelValues: PodcastChannelInterface = {
    userId: null,
    author: null,
    category1: null,
    category2: null,
    copyright: null,
    coverArt: null,
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    description: null,
    email: null,
    explicit: null,
    language: null,
    site: null,
    title: null,
    version: 1
};

export const isValidPodcastChannelType = (data: PodcastChannelInterface): data is PodcastChannelInterface => {
    return (data as PodcastChannelInterface).userId !== undefined;
};
