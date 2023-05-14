import { firestore } from 'firebase-admin';
import { DocumentVersionType, FirestoreDocumentId, URIType, ColorHexCodeType, UrlType } from 'src/types/types';

export interface ProjectInterface {
    id: FirestoreDocumentId;
    groupId: FirestoreDocumentId;
    name: string;
    routeIdentifier: URIType;
    wordList: Array<{ [key: string]: string }>; // array of objects with string key-value pairs
    widgetSettings: {
        primaryColor: ColorHexCodeType;
        primaryPresetTheme: WidgetThemeEnumString;
        playAppLinkIncluded: boolean;
        playAppLinkText: string;
        playAppLink: URIType;
    };
    subscriptionLink: UrlType;
    isEnabled: boolean;
}

export enum WidgetThemeEnum {
    Yingyang = 'yingyang',
    Dark = 'dark',
    Light = 'light',
    Transparent = 'transparent'
}

type WidgetThemeEnumString = keyof typeof WidgetThemeEnum;

export const DEFAULT_PROJECT_VALUES: any = {
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1
};
