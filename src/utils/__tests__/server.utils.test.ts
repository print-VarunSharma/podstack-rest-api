import supertest from 'supertest';
import createServer from '../../utils/server.utils';
const app = createServer();
const request = supertest(app);

describe('Route Integration Tests', () => {
    describe('/sanity-check - get sanity checked', () => {
        it('Should return a 200 & sanity checked', async () => {
            const response = await request.get('/sanity-check');
            expect(response.status).toBe(200);
            expect(response.body.message).toEqual('https://pbs.twimg.com/media/DrZBFLtXcAAhtwV.jpg');
        });
    });
});
