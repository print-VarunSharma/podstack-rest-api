import * as daos from '../../daos/podcasts/podcasts.episodes.daos';
import { DEFAULT_PODCAST_EPISODE_VALUES, PodcastEpisodeInterface } from '../../models/podcasts/podcasts.episode.model';
import { postNewPodcastEpisode } from '../podcasts/podcasts.episodes.services';

jest.mock('../../daos/podcasts/podcasts.episodes.daos');

describe('podcasts episodes test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should provide a valid Podcast Episode document as a response', async () => {
        const payload = {
            channelId: '1',
            narrationId: '1',
            version: null
        } as PodcastEpisodeInterface;

        const expectedEntry: PodcastEpisodeInterface = {
            ...DEFAULT_PODCAST_EPISODE_VALUES,
            ...payload
        };

        const expectedReturnId = '123abc';

        const mock = (daos.createPodcastEpisode as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
        const actual = await postNewPodcastEpisode(payload);

        expect(daos.createPodcastEpisode).toBeCalledTimes(1);
        expect(daos.createPodcastEpisode).toBeCalledWith(expectedEntry);
        expect(actual).toEqual(expectedReturnId);
    });
});
