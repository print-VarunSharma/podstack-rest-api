import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';
const app = createServer();
const request = supertest(app);

describe('Projects Route - E2E Tests', () => {
    describe('GET - /cms-integration-settings/:id - given the correct ID', () => {
        const correctCmsIntegrationSettingsId = 'S26Uf3MffNSERqIytqsS';
        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/cms-integration-settings/${correctCmsIntegrationSettingsId}`);
            expect(response.status).toBe(200);
        });

        it('Should return the correct document', async () => {
            const response = await request.get(`/api/v1/cms-integration-settings/${correctCmsIntegrationSettingsId}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe('S26Uf3MffNSERqIytqsS');
        });
        it('Should return the correct document values from the query', async () => {
            const expectedDocument = {
                method: 'RSS',
                isEnabled: true,
                options: {
                    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
                },
                narrationSettingsId: 'test-narration-settings-id',
                projectId: 'W4gyLOYcqhbvi3A042mw',
                version: 1,
                modifiedDate: {
                    _seconds: 1683946257,
                    _nanoseconds: 29000000
                },
                creationDate: {
                    _seconds: 1683946257,
                    _nanoseconds: 29000000
                },
                id: 'S26Uf3MffNSERqIytqsS'
            };
            const response = await request.get(`/api/v1/cms-integration-settings/${correctCmsIntegrationSettingsId}`);

            const selectedProject = response.body;

            expect(selectedProject['id']).toBe(expectedDocument.id);
            expect(selectedProject['method']).toBe(expectedDocument.method);
            expect(selectedProject['isEnabled']).toBe(expectedDocument.isEnabled);
            expect(selectedProject['options']['url']).toBe(expectedDocument.options.url);
            expect(selectedProject['narrationSettingsId']).toBe(expectedDocument.narrationSettingsId);
            expect(selectedProject['version']).toBe(expectedDocument.version);
        });
    });

    describe('GET - /cms-integration-settings/:id - given the *incorrect* ID', () => {
        const wrongNarrationId = 'WRONG ID';

        it('Should return a 204', async () => {
            const response = await request.get(`/api/v1/cms-integration-settings/${wrongNarrationId}`);
            expect(response.status).toBe(204);
        });
    });

    describe('GET all - /cms-integration-settings/projects/:projectId - given the correct ID', () => {
        const testProjectId = 'W4gyLOYcqhbvi3A042mw';

        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/cms-integration-settings/projects/${testProjectId}`);
            expect(response.status).toBe(200);
        });

        it('Should return the correct number of cms-integration-settings', async () => {
            const response = await request.get(`/api/v1/cms-integration-settings/projects/${testProjectId}`);
            const cmsIntegrationSettingsSet = response.body;
            expect(cmsIntegrationSettingsSet.length).toBeGreaterThan(2);
        });
    });
    describe('POST - /cms-integration-settings/projects/:id - given the correct POST object attribtutes', () => {
        const testProjectId = 'W4gyLOYcqhbvi3A042mw';

        const correctPostObjectAttributes = {
            method: 'RSS',
            options: {
                url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
            },
            isEnabled: true,
            narrationSettingsId: 'test-narration-settings-id'
        };
        let response: any;

        it('Should return a 200', async () => {
            response = await request.post(`/api/v1/cms-integration-settings/projects/${testProjectId}`).send(correctPostObjectAttributes);
            expect(response.status).toBe(201);
        });

        it('Should return the newly created narration document ID', async () => {
            response = await request.post(`/api/v1/cms-integration-settings/projects/${testProjectId}`).send(correctPostObjectAttributes);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(String)
                })
            );
        });
    });
});
