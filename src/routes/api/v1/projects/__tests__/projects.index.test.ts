import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';
// import { StatusEnum, ErrorCodes } from '../../../../../models/project.model';
const app = createServer();
const request = supertest(app);

describe('Projects Route - E2E Tests', () => {
    describe('GET - /projects/:id - given the correct ID', () => {
        const correctProjectId = 'ptV9IRHAO2vzJ5sh4YNZ';
        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/projects/${correctProjectId}`);
            expect(response.status).toBe(200);
        });

        it('Should return a project document', async () => {
            const response = await request.get(`/api/v1/projects/${correctProjectId}`);
            expect(response.status).toBe(200);
            expect(response.body.groupId).toBe('sSPv9sa638YltENz1WoSGsLTRhg2');
        });
        it('Should return the correct document values from the query', async () => {
            const expectedProjectDocument = {
                id: 'ptV9IRHAO2vzJ5sh4YNZ',
                name: 'test project',
                routeIdentifier: 'test-project',
                wordList: [{ hello: 'hello there' }],
                widgetSettings: {
                    primaryColor: '#7AA002',
                    primaryPresetTheme: 'light',
                    playAppLinkIncluded: false,
                    playAppLinkText: 'test link test',
                    playAppLink: 'https://play.ad-auris.com'
                },
                subscriptionLink: 'https://test-project.com/signup',
                isEnabled: true
            };
            const response = await request.get(`/api/v1/projects/${correctProjectId}`);

            const selectedProject = response.body;

            expect(selectedProject['id']).toBe(expectedProjectDocument.id);
            expect(selectedProject['name']).toBe(expectedProjectDocument.name);
            expect(selectedProject['routeIdentifier']).toBe(expectedProjectDocument.routeIdentifier);
            expect(selectedProject['widgetSettings']['primaryColor']).toBe(expectedProjectDocument.widgetSettings.primaryColor);
            expect(selectedProject['widgetSettings']['primaryPresetTheme']).toBe(expectedProjectDocument.widgetSettings.primaryPresetTheme);
            expect(selectedProject['widgetSettings']['playAppLinkText']).toBe(expectedProjectDocument.widgetSettings.playAppLinkText);
            expect(selectedProject['widgetSettings']['playAppLink']).toBe(expectedProjectDocument.widgetSettings.playAppLink);
            expect(selectedProject['subscriptionLink']).toBe(expectedProjectDocument.subscriptionLink);
            expect(selectedProject['isEnabled']).toBe(expectedProjectDocument.isEnabled);
        });
    });

    describe('GET - /projects/:id - given the *incorrect* ID', () => {
        const wrongNarrationId = 'WRONG ID';

        it('Should return a 204', async () => {
            const response = await request.get(`/api/v1/projects/${wrongNarrationId}`);
            expect(response.status).toBe(204);
        });
    });

    xdescribe('GET all - /projects/groups/:groupId - given the correct ID', () => {
        const testUserId = 'sSPv9sa638YltENz1WoSGsLTRhg2';

        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/projects/groups/${testUserId}`);
            expect(response.status).toBe(200);
        });

        it('Should return the correct number of projects denoted by the limit query', async () => {
            const response = await request.get(`/api/v1/projects/groups/${testUserId}?offset=1&limit=10`);

            const projectsSet = response.body;

            expect(projectsSet.length).toBeGreaterThan(5);
        });
    });
    describe('POST - /projects/groups/:id - given the correct POST object attribtutes', () => {
        const testGroupId = 'sSPv9sa638YltENz1WoSGsLTRhg2';

        const correctPostObjectAttributes = {
            name: 'test project',
            routeIdentifier: 'test-project',
            wordList: [{ hello: 'hello there' }],
            widgetSettings: {
                primaryColor: '#7AA002',
                primaryPresetTheme: 'light',
                playAppLinkIncluded: false,
                playAppLinkText: 'test link test',
                playAppLink: 'https://play.ad-auris.com'
            },
            subscriptionLink: 'https://test-project.com/signup',
            isEnabled: true
        };
        let response: any;

        it('Should return a 200', async () => {
            response = await request.post(`/api/v1/projects/groups/${testGroupId}`).send(correctPostObjectAttributes);
            expect(response.status).toBe(201);
        });

        it('Should return the newly created narration document ID', async () => {
            response = await request.post(`/api/v1/projects/groups/${testGroupId}`).send(correctPostObjectAttributes);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(String)
                })
            );
        });
    });
});
