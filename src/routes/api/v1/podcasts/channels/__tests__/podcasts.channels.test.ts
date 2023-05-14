import supertest from 'supertest';
import createServer from '../../../../../../utils/server.utils';
import { isValidPodcastChannelType } from '../../../../../../models/podcasts/podcasts.channels.model';

const app = createServer();
const request = supertest(app);

describe('Podcasts Channel Router Test Suite', () => {
    describe('POST - /api/v1/podcasts/channels Route', () => {
        // This won't post in jest, but posts perfectly fine via manual POST call. Unsure why at the moment.
        // TODO is to fix this
        xit('should create a Podcast Channel entry', async () => {
            const payload = { userId: 'jest-test' };
            const response = await request.post(`/api/v1/podcasts/channels`).send(payload);
            expect(response.status).toBe(201);
            expect(response.body.id).toBeDefined();
        });

        it('should reject Podcast Channel entry due to AjV validation error', async () => {
            const payload = { invalidUserIdField: 'jest-test' };
            const response = await request.post(`/api/v1/podcasts/channels`).send(payload);

            expect(response.status).toBe(400);
            expect(response.body.id).toBeUndefined();
        });
    });

    describe('GET - /api/v1/podcasts/channels Route', () => {
        it('should return valid Podcast channel document entry for correct document Id', async () => {
            const podcastChannelId = 'auUMXvqzKoRoSk1VfXyR';
            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('userId');
        });

        it('should not return a valid Podcast channel document entry for incorrect document Id', async () => {
            const podcastChannelId = 'NON-EXISTIANT-ID';

            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}`);

            expect(response.status).toBe(204);
            expect(response.body).toBeDefined();
        });

        it('should return valid Podcast channel document entry for user Id', async () => {
            const userId = 'jest-test';

            const response = await request.get(`/api/v1/podcasts/channels/users/${userId}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThan(1);
        });
    });

    describe('GET - /api/v1/podcasts/channels/:podcastChannelId/episodes Route', () => {
        const podcastChannelId = 'auUMXvqzKoRoSk1VfXyR';

        it('should return a 200', async () => {
            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}/episodes`);
            expect(response.status).toBe(200);
        });

        it('should return a a list of podcast episodes', async () => {
            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}/episodes`);

            const podcastEpisodes = response.body;
            expect(response.status).toBe(200);
            expect(podcastEpisodes).toBeDefined();
            expect(podcastEpisodes.length).toBeGreaterThan(2);
        });
    });

    describe('GET - /api/v1/podcasts/channels/:podcastChannelId/narrations Route', () => {
        const podcastChannelId = 'auUMXvqzKoRoSk1VfXyR';

        it('should return a 200', async () => {
            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}/narrations`);
            expect(response.status).toBe(200);
        });

        it('should return a a list of the podcast narration', async () => {
            const response = await request.get(`/api/v1/podcasts/channels/${podcastChannelId}/narrations`);

            const podcastEpisodes = response.body;
            expect(response.status).toBe(200);
            expect(podcastEpisodes).toBeDefined();
            expect(podcastEpisodes.length).toBeGreaterThan(2);
        });
    });
});
