import { firestore } from 'firebase-admin';
import {
    DocumentVersionType,
    FirestoreDocumentId,
    UrlType,
    LanguageCodeType,
    UTCEpochDateType,
    FirestoreTimestampType,
    DurationType
} from 'src/types/types';

export interface AudioInterface {
    language: LanguageCodeType;
    source: UrlType;
}

export type VoiceCodeType = string;
// E.g en-US-JennyNeural

export interface NarrationSettingsInterface {
    titleVoice: VoiceCodeType;
    bodyVoice: VoiceCodeType;
}

export interface NarrationInterface {
    id: FirestoreDocumentId;
    userId: FirestoreDocumentId;
    creationDate: FirestoreTimestampType;
    modifiedDate: FirestoreTimestampType;
    title: string;
    audio: UrlType;
    narrationSettings: NarrationSettingsInterface;
    narrationMethod: string;
    sourceUrl: UrlType;
    // where URL is article URL, uploaded PDF, text bucket URL
    sourceType: UrlType;
    // where type is article, doc, pdf, file, scanned, etc
    image: UrlType;
    sourceLanguage: LanguageCodeType;
    category: string;
    publishDate: FirestoreTimestampType;
    siteName: string;
    podcastChannelId: FirestoreDocumentId;
    version: DocumentVersionType;
    status: StatusEnumStrings;
    duration?: DurationType; // * See relevant ADR: https://www.notion.so/play-auris/ADR-Narration-Document-Update-for-Audio-Duration-94215762d01e4ef3a9a6c4fce0903cd3

    // Diffbot metadata response: https://docs.diffbot.com/reference/article

    // Google Metadata response:
    //     {
    //      sentiment: { magnitude: 1.399999976158142, score: 0.30000001192092896 },
    //     language: 'en',
    //     categories: { categories: [{"name":"/Arts & Entertainment","confidence":0.6200000047683716}] }
    //      }
    // The metadata provider responses is inconsistenly structured between each other so the sub-metadata objects will be optional
    metadata: { diffbot?: object; google?: object };
    // * Leave as general object for now so that it can be expanded upon elsewhere without having to update here
    // https://www.notion.so/play-auris/ADR-Narration-Document-Update-for-Slack-8387892b61ee445689295f015efcbe46
    externalAppData?: object;
    errorCode?: ErrorCodeNumbers;
    stats?: object;
}

type StatusEnumStrings = keyof typeof StatusEnum;
type ErrorCodeNumbers = keyof typeof ErrorCodes;

export enum ErrorCodes {
    'EXTRACTION_FAILURE' = 100,
    'EXCEEDS_CHAR_LIMIT' = 200,
    'UNSUPPORTED_LANGUAGE' = 300,
    'AUDIO_PRODUCTION_ERROR' = 400
}

export enum StatusEnum {
    Success = 'SUCCESS',
    Failure = 'FAILURE',
    Pending = 'PENDING',
    Debug = 'DEBUG'
}

export const DEFAULT_NARRATION_VALUES: any = {
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1
};
