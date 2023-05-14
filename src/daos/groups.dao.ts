import { contentDoesNotExist } from '../constants/errors.constants';
import { firestoreDatabase } from '../config/firebase/firebase';
import { GroupInterface } from 'src/models/group.model';

export const getGroupById = async (groupId: string): Promise<GroupInterface> => {
    try {
        const snapShotDocument = await firestoreDatabase.collection('Group').doc(groupId).get();
        const group = snapShotDocument.data() as GroupInterface;

        if (group) {
            group.id = snapShotDocument.id;
        } else {
            throw new Error(contentDoesNotExist);
        }

        return group;
    } catch (error) {
        console.log('getGroupById|Error fetching entry');
        throw error;
    }
};

export const getAllGroups = async (): Promise<GroupInterface[]> => {
    try {
        const snapshot = await firestoreDatabase.collection('Group').get();
        const data: GroupInterface[] = snapshot.docs.map((document) => {
            const group = document.data() as GroupInterface;

            if (group) {
                group.id = document.id;
            }

            return group;
        });

        return data;
    } catch (error) {
        console.log('getAllGroups|Error fetching entry');
        throw error;
    }
};

export const createGroup = async (group: GroupInterface): Promise<string> => {
    try {
        const newEntry = await firestoreDatabase.collection('Group').add(group);

        console.log(`createGroup|added new entry with ${newEntry.id}`);

        return newEntry.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
