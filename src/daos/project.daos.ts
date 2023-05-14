import { firestoreDatabase } from '../config/firebase/firebase';
import { ProjectInterface } from '../models/project.model';

const collectionName = 'Projects';

export const getById = async (id: string): Promise<ProjectInterface> => {
    try {
        const projectDocument = await firestoreDatabase.collection(collectionName).doc(id).get();

        const project = projectDocument.data() as ProjectInterface;

        if (project) {
            project.id = projectDocument.id;
        }

        return project;
    } catch (error) {
        console.log('Error fetching project data:', error);
        throw error;
    }
};

export const getAll = async (groupId: string, offset: number, limit: number): Promise<ProjectInterface[]> => {
    try {
        let projectsList: any[] = [];
        const projectsCollectionSnapshot = await firestoreDatabase
            .collection(collectionName)
            .where('groupId', '==', groupId)
            .orderBy('creationDate', 'desc')
            .limit(limit)
            .offset(offset)
            .get();
        // Documentation on offset + limit queries via Firestore: https://googleapis.dev/nodejs/firestore/latest/Query.html#offset

        const projects = projectsCollectionSnapshot.docs.map((project) => {
            projectsList.push({
                id: project.id,
                ...project.data()
            });
        });

        return projectsList as ProjectInterface[];
    } catch (error) {
        console.log('Error fetching project data:', error);
        throw error;
    }
};

export const create = async (projectData: ProjectInterface): Promise<ProjectInterface | void> => {
    try {
        const createdProject = await firestoreDatabase.collection(collectionName).add(projectData);
        console.log('Added document with ID: ', createdProject.id);

        // add the created id to the input data, and return the project
        Object.assign(projectData, { id: createdProject.id });

        return projectData;
    } catch (error) {
        console.log('Error fetching project data:', error);
        throw error;
    }
};

export const updateById = async (id: string, data: object): Promise<string> => {
    try {
        const projectDocument = await firestoreDatabase.collection(collectionName).doc(id).update(data);
        return id;
    } catch (error) {
        console.log('Error fetching project data:', error);
        throw error;
    }
};

export const deleteById = async (id: string): Promise<void> => {
    try {
        await firestoreDatabase.collection(collectionName).doc(id).delete({ exists: true });
        return;
    } catch (error) {
        console.log('Error deleting project:', error);
        throw error;
    }
};
