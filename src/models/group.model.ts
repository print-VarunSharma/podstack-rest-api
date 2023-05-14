import { DocumentVersionType, UrlType, FirestoreTimestampType, FirestoreDocumentId } from '../types/types';

export interface GroupInterface {
    id: FirestoreDocumentId;
    name: string;
    createdDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    siteUrl: UrlType;
    version: DocumentVersionType;
}
