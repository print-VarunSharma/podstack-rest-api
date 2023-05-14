import supertest from 'supertest';
import createServer from '../../../../../../utils/server.utils';
const app = createServer();
const request = supertest(app);

describe('Podcasts Episodes Route E2E Tests', () => {
    describe('get /podcasts/episodes/:id - given the correct ID', () => {
        const testEpisodeId = 'YzMAR5Sry7tgjEV6bwD7';
        it('should return a 200', async () => {
            const response = await request.get(`/api/v1/podcasts/episodes/${testEpisodeId}`);
            expect(response.status).toBe(200);
        });

        it('should return an episode', async () => {
            const expectedBody = {
                narrationId: 'test',
                channelId: 'test',
                // Do we want dates to be returned in this format? Confirming here.
                creationDate: {
                    _nanoseconds: 497000000,
                    _seconds: 1683861037
                },
                id: 'YzMAR5Sry7tgjEV6bwD7',
                modifiedDate: {
                    _nanoseconds: 497000000,
                    _seconds: 1683861037
                },
                version: 1
            };

            const response = await request.get(`/api/v1/podcasts/episodes/${testEpisodeId}`);
            expect(response.body).toEqual(expectedBody);
        });
    });

    describe('get /podcasts/episodes/:id - given the *incorrect* ID', () => {
        const testEpisodeId = 'WRONG EPISODE ID';
        it('should return a 204', async () => {
            const response = await request.get(`/api/v1/podcasts/episodes/${testEpisodeId}`);
            expect(response.status).toBe(204);
        });
    });

    describe('post /podcasts/episodes/ with correct req.body', () => {
        it('should create a new podcast episode and return a new id', async () => {
            const body = { narrationId: 'test', channelId: 'test' };
            const response = await request.post(`/api/v1/podcasts/episodes/`).send(body);

            expect(response.status).toBe(201);
        });
    });

    describe('post /podcasts/episodes/ with incorrect req.body', () => {
        it('should fail with missing narrationId', async () => {
            const body = { channelId: 'test' };
            const response = await request.post(`/api/v1/podcasts/episodes/`).send(body);

            expect(response.status).toBe(400);
            expect(response.body[0].message).toBe("must have required property 'narrationId'");
            expect(response.body[0].params.missingProperty).toBe('narrationId');
        });

        it('should fail with missing channelId', async () => {
            const body = { narrationId: 'test' };
            const response = await request.post(`/api/v1/podcasts/episodes/`).send(body);

            expect(response.status).toBe(400);
            expect(response.body[0].message).toBe("must have required property 'channelId'");
            expect(response.body[0].params.missingProperty).toBe('channelId');
        });
        it('should fail with wrong type of narrationId', async () => {
            // set as number instead of string
            const body = { narrationId: 1 };
            const response = await request.post(`/api/v1/podcasts/episodes/`).send(body);

            expect(response.status).toBe(400);
            expect(response.body[1].message).toBe('must be string');
            expect(response.body[1].instancePath).toBe('/narrationId');
        });
        it('should fail with wrong type of channelId', async () => {
            // set as number instead of string
            const body = { channelId: 1 };
            const response = await request.post(`/api/v1/podcasts/episodes/`).send(body);

            expect(response.status).toBe(400);
            expect(response.body[1].message).toBe('must be string');
            expect(response.body[1].instancePath).toBe('/channelId');
        });
    });
});
