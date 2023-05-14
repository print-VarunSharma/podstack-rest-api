import { firestoreDatabase } from '../../config/firebase/firebase';
import { ProjectInterface } from '../../models/project.model';
import * as ProjectDao from '../project.daos';

jest.mock('../../config/firebase/firebase');
describe('project DAO Tests', () => {
    describe('getById', () => {
        it('should return the project with the given ID', async () => {
            // Mock Firestore document data
            const mockProjectData: ProjectInterface = {
                id: '123',
                groupId: 'group123',
                name: 'Test Project',
                routeIdentifier: 'test-project',
                wordList: [],
                widgetSettings: {
                    primaryColor: '#FFFFFF',
                    primaryPresetTheme: 'Light',
                    playAppLinkIncluded: true,
                    playAppLinkText: 'Download App',
                    playAppLink: 'https://example.com/app'
                },
                subscriptionLink: 'https://example.com/subscribe',
                isEnabled: true
            };

            // Mock Firestore document snapshot
            const mockSnapshot = {
                data: jest.fn(() => mockProjectData),
                id: '123'
            };

            // Mock Firestore collection and document retrieval
            const mockGet = jest.fn(() => Promise.resolve(mockSnapshot));
            const mockDoc = jest.fn().mockReturnThis();
            const mockCollection = jest.fn().mockReturnThis();

            firestoreDatabase.collection = mockCollection;
            mockCollection.mockReturnValueOnce({
                doc: mockDoc
            });
            mockDoc.mockReturnValueOnce({
                get: mockGet
            });

            // Call the getById function
            const projectId = '123';
            const result = await ProjectDao.getById(projectId);

            // Assertions
            expect(result).toEqual(mockProjectData);
            expect(firestoreDatabase.collection).toHaveBeenCalledWith('Projects');
            expect(mockDoc).toHaveBeenCalledWith(projectId);
            expect(mockGet).toHaveBeenCalled();
        });

        it('should throw an error if there is an error fetching project data', async () => {
            // Mock Firestore collection and document retrieval error
            const mockError = new Error('Error fetching project data');
            const mockGet = jest.fn(() => Promise.reject(mockError));
            const mockDoc = jest.fn().mockReturnThis();
            const mockCollection = jest.fn().mockReturnThis();

            firestoreDatabase.collection = mockCollection;
            mockCollection.mockReturnValueOnce({
                doc: mockDoc
            });
            mockDoc.mockReturnValueOnce({
                get: mockGet
            });

            // Call the getById function
            const projectId = '123';
            await expect(ProjectDao.getById(projectId)).rejects.toThrowError('Error fetching project data');
        });
    });
});
