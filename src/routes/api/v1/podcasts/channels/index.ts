import { Router } from 'express';
import validateSchema from '../../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../../types/schema/schema.constants';
import * as podcastsChannelController from '../../../../../controllers/podcasts/podcasts.channels.controllers';
import * as podcastsEpisodeController from '../../../../../controllers/podcasts/podcasts.episodes.controllers';

const podcastChannelRouter = Router({ mergeParams: true });

podcastChannelRouter.post('/', validateSchema(SCHEMA_NAMES.PODCAST_CHANNELS_POST), podcastsChannelController.postPodcastChannel);
podcastChannelRouter.get('/users/:userId', podcastsChannelController.getPodcastChannelByUserId);
podcastChannelRouter.get('/:podcastChannelId', podcastsChannelController.getPodcastChannel);
// ! Not in use but functional (/:podcastChannelId/episodes)
podcastChannelRouter.get('/:podcastChannelId/episodes', podcastsEpisodeController.getAllPodcastEpisodesByChannel);

// In use for Play App Podcasting API (/:podcastChannelId/narrations)
podcastChannelRouter.get('/:podcastChannelId/narrations', podcastsChannelController.getNarrationsByPodcastChannelId);
export default podcastChannelRouter;
