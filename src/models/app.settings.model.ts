import { firestore } from 'firebase-admin';
import { DocumentVersionType, FirestoreDocumentId, FirestoreTimestampType } from 'src/types/types';

interface NotificationPreferencesInterface {
    ignoreNarrationFailureReasonMessage: boolean;
    ignoreAlternateErrorMessage: boolean;
    ignoreChromeExtReminder: boolean;
    ignoreEmailerServiceReminder: boolean;
}
export interface AppSettings {
    readonly id: FirestoreDocumentId;
    readonly userId: FirestoreDocumentId;
    readonly creationDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    readonly version: DocumentVersionType;
    NotificationPreferences: NotificationPreferencesInterface;
}

export const DEFAULT_APP_SETTING_VALUES: any = {
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1,
    NotificationPreferences: {
        ignoreNarrationFailureReasonMessage: false,
        ignoreAlternateErrorMessage: false,
        ignoreChromeExtReminder: false,
        ignoreEmailerServiceReminder: false
    }
};
