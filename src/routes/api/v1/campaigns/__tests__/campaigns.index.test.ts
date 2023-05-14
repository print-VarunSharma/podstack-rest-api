import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';
const app = createServer();
const request = supertest(app);

// ! As we are not using campaigns yet, I will leave this off as it's finicky at the moment. I did create an index for this route to work as well.
xdescribe('Campaigns Route E2E Tests', () => {
    describe('/campaigns/name/:campaignName - given the correct name', () => {
        const campaignName = 'testing';
        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/campaigns/name/${campaignName}`);
            expect(response.status).toBe(200);
        });
        it('Should return an array of campaigns with the corresponding the name', async () => {
            // ! this data is tied to the dev firebase environment
            const response = await request.get(`/api/v1/campaigns/name/${campaignName}`);
            expect(response.body[0].isEnabled).toBe(true);
            expect(response.body[0].splashPage.headerText).toBe('This is test text');
            expect(response.body[0].splashPage.subtext).toBe('subtext goes here');
            expect(response.body[0].splashPage.textinputTitle).toBe('title here');
            expect(response.body[0].splashPage.mainImageSrc).toBe(
                'https://storage.googleapis.com/ad-auris-mvp-bucket/play_campaign_images/splash_hero_dynamic.png'
            );
            expect(response.body[0].splashPage.textinputPlaceholder).toBe('this is placeholder');
            expect(response.body[0].splashPage.buttonText).toBe('this is button text');
            expect(response.body[0].version).toBe(1);
            expect(response.body[0].id).toBe('jq6hOdOBn6QF4y0OvZLk');
            expect(response.body[0].campaignName).toBe('testing');
        });
    });
    describe('/campaigns/name/:campaignName - given the *incorrect* campaign name', () => {
        const campaignName2 = 'WRONG CAMPAIGN NAME';
        it('Should return a 204', async () => {
            const response = await request.get(`/api/v1/campaigns/name/${campaignName2}`);
            expect(response.status).toBe(204);
        });
    });
});
