import * as daos from '../../daos/podcasts/podcasts.channels.daos';
import { defaultPodcastChannelValues, PodcastChannelInterface } from '../../models/podcasts/podcasts.channels.model';
import { getPodcastChannel, getPodcastChannelByUser, postNewPodcastChannel } from '../podcasts/podcasts.channels.services';
import { createPodcastChannel, getPodcastChannelByUserId } from '../../daos/podcasts/podcasts.channels.daos';
import { getPodcastChannelById } from '../../daos/podcasts/podcasts.channels.daos';

jest.mock('../../daos/podcasts/podcasts.channels.daos');

describe('podcasts services test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('creating a podcast channel', () => {
        it('should provide a valid Podcast Channel document as a response', async () => {
            const payload = {
                userId: '1234',
                author: null,
                category1: null,
                category2: null,
                copyright: null,
                coverArt: null,
                description: null,
                email: null,
                explicit: null,
                language: null,
                site: null,
                title: null,
                version: null
            } as PodcastChannelInterface;

            const expectedEntry: PodcastChannelInterface = {
                ...defaultPodcastChannelValues,
                userId: '1234'
            };

            const expectedReturnId = '123abc';

            const mock = (daos.createPodcastChannel as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
            const actual = await postNewPodcastChannel(payload);

            expect(createPodcastChannel).toBeCalledTimes(1);
            expect(createPodcastChannel).toBeCalledWith(expectedEntry);
            expect(actual).toEqual(expectedReturnId);
        });
    });

    describe('fetching a podcast channel', () => {
        it('should return a valid document on response to search by document ID', async () => {
            const documentId = 'abc123';

            const mockedResponse = {
                ...defaultPodcastChannelValues,
                id: documentId,
                userId: '123abc'
            };

            const mock = (daos.getPodcastChannelById as jest.MockedFunction<any>).mockResolvedValue(mockedResponse);
            const actual = await getPodcastChannel(documentId);

            expect(getPodcastChannelById).toBeCalledTimes(1);
            expect(getPodcastChannelById).toBeCalledWith(documentId);
            expect(actual).toEqual(mockedResponse);
        });

        it('should return a valid document on response to search by user ID', async () => {
            const userId = 'abc123';

            const mockedResponse = [
                {
                    ...defaultPodcastChannelValues,
                    id: '123abc',
                    userId: userId
                }
            ];

            const mock = (daos.getPodcastChannelByUserId as jest.MockedFunction<any>).mockResolvedValue(mockedResponse);
            const actual = await getPodcastChannelByUser(userId);

            expect(getPodcastChannelByUserId).toBeCalledTimes(1);
            expect(getPodcastChannelByUserId).toBeCalledWith(userId);
            expect(actual).toEqual(mockedResponse);
        });
    });
});
