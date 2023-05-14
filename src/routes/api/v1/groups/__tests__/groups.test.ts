import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';

const app = createServer();
const request = supertest(app);

describe('Groups Collection Router Test Suite', () => {
    describe('GET - /api/v1/groups/:groupId Route', () => {
        it('should return valid Groups document entry for correct document Id', async () => {
            const groupId = 'jest-test';
            const response = await request.get(`/api/v1/groups/${groupId}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('id');
        });

        it('should not return a valid Groups document entry for incorrect document Id', async () => {
            const groupId = 'NON-EXISTIANT-ID';

            const response = await request.get(`/api/v1/groups/${groupId}`);

            expect(response.status).toBe(204);
            expect(response.body).toBeDefined();
        });
    });

    describe('GET - /api/v1/groups Route', () => {
        it('should return all Groups documents', async () => {
            const response = await request.get('/api/v1/groups');

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('POST - /api/v1/groups Route', () => {
        it('should return a 201', async () => {
            const response = await request.post('/api/v1/groups').send({
                name: 'Jest Test Group',
                siteUrl: 'https://ad-auris.com'
            });

            expect(response.status).toBe(201);
        });
    });
});
