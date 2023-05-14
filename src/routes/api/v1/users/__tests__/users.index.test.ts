import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';
const app = createServer();
const request = supertest(app);

describe('Users Route E2E Tests', () => {
    describe('/users/:id - given the correct ID', () => {
        const testUserId = 'HYgool82YrXTF2mekDlqow23hQV2';
        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/users/${testUserId}`);
            expect(response.status).toBe(200);
        });

        it('Should return a user', async () => {
            const response = await request.get(`/api/v1/users/${testUserId}`);
            expect(response.status).toBe(200);
            expect(response.body.email).toBe('varun@adoris.me');
            expect(response.body.uid).toBe('HYgool82YrXTF2mekDlqow23hQV2');
        });
    });

    describe('/users/:id - given the *incorrect* ID', () => {
        const testUserId2 = 'WRONG USER ID';
        it('Should return a 204', async () => {
            const response = await request.get(`/api/v1/users/${testUserId2}`);
            expect(response.status).toBe(204);
        });
    });
});
