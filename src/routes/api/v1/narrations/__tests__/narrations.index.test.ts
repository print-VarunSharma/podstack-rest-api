import supertest from 'supertest';
import createServer from '../../../../../utils/server.utils';
import { StatusEnum, ErrorCodes } from '../../../../../models/narration.model';
const app = createServer();
const request = supertest(app);

describe('Narrations Route E2E Tests', () => {
    describe('GET - /narrations/:id - given the correct ID', () => {
        const correctNarrationId = 'f6aWy1hJAhheys1rP6hz';
        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/narrations/${correctNarrationId}`);
            expect(response.status).toBe(200);
        });

        it('Should return a narration', async () => {
            const response = await request.get(`/api/v1/narrations/${correctNarrationId}`);
            expect(response.status).toBe(200);
            expect(response.body.userId).toBe('sSPv9sa638YltENz1WoSGsLTRhg2');
        });
        it('Should return the correct document values from the query', async () => {
            const expectedNarrationDocument = {
                id: 'f6aWy1hJAhheys1rP6hz',
                category: 'Breaking News',
                narrationMethod: 'dashboard app',
                // publishDate: '2022-10-13T00:36:17.472Z',
                // This needs to be fixed potentially.. Keep an eye on dates
                publishDate: { _nanoseconds: 472000000, _seconds: 1665621377 },
                sourceType: 'article',
                sourceUrl: 'https://www.cbc.ca/news/politics/public-inquiry-emergencies-act-witness-list-1.6612455',
                sourceLanguage: 'en',
                image: 'https://www.aljazeera.com/wp-content/uploads/2022/10/AP22272440541920.jpg?resize=770%2C513',
                audio: 'https://storage.googleapis.com/ad-auris-mvp-bucket/data-dashboard-narrations/water-markets-jennifer-oldham.mp3',
                narrationSettings: {
                    titleVoice: 'en-US-JennyNeural',
                    bodyVoice: 'en-US-JennyNeural'
                },
                title: 'narration-28',
                siteName: 'Aljazeera',
                podcastChannelId: 'StnZtb4Qmyh3apKHUbVE',
                status: 'SUCCESS'
            };
            const response = await request.get(`/api/v1/narrations/${correctNarrationId}`);

            const selectedNarration = response.body;

            expect(selectedNarration['id']).toBe(expectedNarrationDocument.id);
            expect(selectedNarration['title']).toBe(expectedNarrationDocument.title);
            expect(selectedNarration['narrationMethod']).toBe(expectedNarrationDocument.narrationMethod);
            expect(selectedNarration['sourceUrl']).toBe(expectedNarrationDocument.sourceUrl);
            expect(selectedNarration['sourceType']).toBe(expectedNarrationDocument.sourceType);
            expect(selectedNarration['sourceLanguage']).toBe(expectedNarrationDocument.sourceLanguage);
            expect(selectedNarration['image']).toBe(expectedNarrationDocument.image);
            expect(selectedNarration['publishDate']).toStrictEqual(expectedNarrationDocument.publishDate);
            expect(selectedNarration['audio']).toStrictEqual(expectedNarrationDocument.audio);
        });
    });

    describe('GET - /narrations/:id - given the *incorrect* ID', () => {
        const wrongNarrationId = 'WRONG NARRATION ID';

        it('Should return a 204', async () => {
            const response = await request.get(`/api/v1/narrations/${wrongNarrationId}`);
            expect(response.status).toBe(204);
        });
    });

    describe('GET all - /users/userId/narrations?offset&?limit - given the correct ID', () => {
        const testUserId = 'sSPv9sa638YltENz1WoSGsLTRhg2';

        it('Should return a 200', async () => {
            const response = await request.get(`/api/v1/narrations/users/${testUserId}`);
            expect(response.status).toBe(200);
        });

        it('Should return the correct number of narrations denoted by the limit query', async () => {
            const response = await request.get(`/api/v1/narrations/users/${testUserId}?offset=1&limit=10`);

            const narrationsSet = response.body;

            expect(narrationsSet.length).toBe(10);
        });
    });
    describe('POST - /narrations/users/:id - given the correct POST object attribtutes', () => {
        const testUserId = 'sSPv9sa638YltENz1WoSGsLTRhg2';

        const correctPostObjectAttributes = {
            category: 'Breaking News',
            narrationMethod: 'dashboard app',
            publishDate: '2022-10-13T00:36:17.472Z',
            // stores it as a firestore timestamp obj
            sourceType: 'article',
            sourceUrl: 'https://www.cbc.ca/news/politics/public-inquiry-emergencies-act-witness-list-1.6612455',
            sourceLanguage: 'en',
            image: 'https://www.aljazeera.com/wp-content/uploads/2022/10/AP22272440541920.jpg?resize=770%2C513',
            audio: 'https://storage.googleapis.com/ad-auris-mvp-bucket/data-dashboard-narrations/water-markets-jennifer-oldham.mp3',
            narrationSettings: {
                titleVoice: 'en-US-JennyNeural',
                bodyVoice: 'en-US-JennyNeural'
            },
            title: 'Ukraine war: Putin not bluffing about nuclear weapons, EU says',
            siteName: 'Aljazeera',
            podcastChannelId: 'StnZtb4Qmyh3apKHUbVE',
            status: 'SUCCESS',
            errorCode: ErrorCodes.AUDIO_PRODUCTION_ERROR,
            stats: {
                charUsage: {
                    totalChars: 100,
                    charsByVoice: {
                        'en-US-JennyNeural': 90,
                        'en-CA-LiamNeural': 10
                    },
                    charsByProvider: {
                        azure: {
                            neural: 100,
                            standard: 0
                        }
                    }
                }
            }
        };

        let response: any;

        it('Should return a 200', async () => {
            response = await request.post(`/api/v1/narrations/users/${testUserId}`).send(correctPostObjectAttributes);
            expect(response.status).toBe(201);
        });

        it('Should return the newly created narration document ID', async () => {
            response = await request.post(`/api/v1/narrations/users/${testUserId}`).send(correctPostObjectAttributes);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(String)
                })
            );
        });

        it('Should return a 201 when provided with a null category, image, title or siteName (could be null from Diffbot parsing)', async () => {
            const postObjectAttributes = {
                ...correctPostObjectAttributes,
                category: null,
                image: null,
                title: null,
                siteName: null
            };
            const response = await request.post(`/api/v1/narrations/users/${testUserId}`).send(postObjectAttributes);
            expect(response.status).toBe(201);
        });

        it.each(Object.values(StatusEnum))('Should return newly created document accepting status code %s', async (status) => {
            const payload = {
                ...correctPostObjectAttributes,
                status
            };
            const response = await request.post(`/api/v1/narrations/users/${testUserId}`).send(payload);
            expect(response.status).toBe(201);
        });

        it('should reject with invalid status', async () => {
            const payload = {
                ...correctPostObjectAttributes,
                status: 'NOT A VALID STATUS CODE'
            };
            const response = await request.post(`/api/v1/narrations/users/${testUserId}`).send(payload);
            expect(response.status).toBe(400);
        });

        // * Delete is nested in the POST block since it always requires a new narration to delete
        describe('Delete - /narrations/:id - given the correct ID', () => {
            it('Should return a 200', async () => {
                const deleteResponse = await request.delete(`/api/v1/narrations/${response.body.id}`);
                expect(deleteResponse.status).toBe(200);
            });
        });
    });

    describe('Delete - /narrations/:id - given the incorrect ID', () => {
        const incorrectNarrationId = 'fakeId';

        it('Should return a 404', async () => {
            const response = await request.delete(`/api/v1/narrations/${incorrectNarrationId}`);
            expect(response.status).toBe(404);
        });
    });

    describe('PATCH - /narrations/:id - given the correct ID', () => {
        const correctNarrationId = 'QfXLZIU4NaV2HTzK3zPW';
        const patchBody = {
            podcastChannelId: '36xrrduM2JlEj7vLaLw5'
        };
        it('Should return a 200', async () => {
            const response = await request.patch(`/api/v1/narrations/${correctNarrationId}`).send(patchBody);
            expect(response.status).toBe(200);
        });

        it('Should return a the updated narration ID', async () => {
            const response = await request.patch(`/api/v1/narrations/${correctNarrationId}`).send(patchBody);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe('QfXLZIU4NaV2HTzK3zPW');
        });

        it('Should patch the duration value', async () => {
            const patchBody = {
                duration: 50
            };
            const response = await request.patch(`/api/v1/narrations/${correctNarrationId}`).send(patchBody);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe('QfXLZIU4NaV2HTzK3zPW');
        });
    });
});
