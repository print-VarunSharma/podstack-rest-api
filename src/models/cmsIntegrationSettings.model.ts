import { firestore } from 'firebase-admin';
import { FirestoreDocumentId, UrlType, FirestoreTimestampType } from 'src/types/types';

export interface CmsIntegrationSettingsInterface {
    id: FirestoreDocumentId;
    projectId: FirestoreDocumentId;
    method: string;
    // currently, method is just RSS (unless we add other CmsIntegrations)
    isEnabled: boolean;
    options: {
        url: UrlType;
        // potentially adding in apiKey
    };
    narrationSettingsId: FirestoreDocumentId;
    creationDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    version: number;
}

export const DEFAULT_DATA_VALUES: any = {
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1
};
