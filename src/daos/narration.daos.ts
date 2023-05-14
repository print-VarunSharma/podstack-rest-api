import { firestoreDatabase } from '../config/firebase/firebase';
import { NarrationInterface } from '../models/narration.model';

export const getById = async (id: string): Promise<NarrationInterface> => {
    try {
        const narrationDocument = await firestoreDatabase.collection('Narrations').doc(id).get();

        const narration = narrationDocument.data() as NarrationInterface;

        if (narration) {
            narration.id = narrationDocument.id;
        }

        return narration;
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};

export const getAll = async (userId: string, offset: number, limit: number): Promise<NarrationInterface[]> => {
    try {
        let narrationsList: any[] = [];
        const narrationsCollectionSnapshot = await firestoreDatabase
            .collection('Narrations')
            .where('userId', '==', userId)
            .orderBy('creationDate', 'desc')
            .limit(limit)
            .offset(offset)
            .get();
        // Documentation on offset + limit queries via Firestore: https://googleapis.dev/nodejs/firestore/latest/Query.html#offset

        const narrations = narrationsCollectionSnapshot.docs.map((narration) => {
            narrationsList.push({
                id: narration.id,
                ...narration.data()
            });
        });

        return narrationsList as NarrationInterface[];
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};

export const getAllByWhatsappNumber = async (phoneNumber: string, offset: number, limit: number): Promise<NarrationInterface[]> => {
    try {
        // * ADR for whatsAppData: https://www.notion.so/play-auris/ADR-Narration-Document-Update-for-WhatsApp-274661fd651a4d05bdf72164cdaac7c9
        const narrationsCollectionSnapshot = await firestoreDatabase
            .collection('Narrations')
            .where('externalAppData.whatsAppData.phone', '==', parseInt(phoneNumber))
            .orderBy('creationDate', 'desc')
            .limit(limit)
            .offset(offset)
            .get();
        // Documentation on offset + limit queries via Firestore: https://googleapis.dev/nodejs/firestore/latest/Query.html#offset

        const narrations = narrationsCollectionSnapshot.docs.map((narration) => ({
            id: narration.id,
            ...narration.data()
        }));

        return narrations as NarrationInterface[];
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};

export const create = async (narrationData: NarrationInterface): Promise<NarrationInterface | void> => {
    try {
        const createdNarration = await firestoreDatabase.collection('Narrations').add(narrationData);
        console.log('Added document with ID: ', createdNarration.id);

        // add the created id to the input data, and return the narration
        Object.assign(narrationData, { id: createdNarration.id });

        return narrationData;
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};

export const updateById = async (id: string, data: object): Promise<string> => {
    try {
        const narrationDocument = await firestoreDatabase.collection('Narrations').doc(id).update(data);
        return id;
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};

export const deleteById = async (id: string): Promise<void> => {
    try {
        await firestoreDatabase.collection('Narrations').doc(id).delete({ exists: true });
        return;
    } catch (error) {
        console.log('Error deleting narration:', error);
        throw error;
    }
};

export const getEntireCollection = async (): Promise<NarrationInterface[]> => {
    try {
        let narrationsList: any[] = [];
        const narrationsCollectionSnapshot = await firestoreDatabase.collection('Narrations').orderBy('creationDate', 'desc').get();

        const narrations = narrationsCollectionSnapshot.docs.map((narration) => {
            narrationsList.push({
                id: narration.id,
                ...narration.data()
            });
        });

        return narrationsList as NarrationInterface[];
    } catch (error) {
        console.log('Error fetching narration data:', error);
        throw error;
    }
};
