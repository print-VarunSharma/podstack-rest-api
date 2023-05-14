import { FirestoreDocumentId } from 'src/types/types';

export interface SplashPageInterface {
    headerText?: string;
    subtext?: string;
    textinputTitle?: string;
    textinputPlaceholder?: string;
    buttonText?: string;
    mainImageSrc?: string;
}

export interface CampaignContentInterface {
    id: FirestoreDocumentId;
    campaignName: string;
    isEnabled: boolean;
    version: number;
    creationDate: Date;
    modifiedDate: Date;
    splashPage?: SplashPageInterface;
}
