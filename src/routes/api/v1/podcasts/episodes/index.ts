import express from 'express';
import validateSchema from '../../../../../middleware/router.validator';
import { SCHEMA_NAMES } from '../../../../../types/schema/schema.constants';
import * as podcastsEpisodesController from '../../../../../controllers/podcasts/podcasts.episodes.controllers';
const PodcastEpisodesRouter = express.Router({ mergeParams: true });

PodcastEpisodesRouter.get('/:episodeId', podcastsEpisodesController.getPodcastEpisode);
PodcastEpisodesRouter.post('/', validateSchema(SCHEMA_NAMES.PODCAST_EPISODES_POST), podcastsEpisodesController.postPodcastEpisode);

export default PodcastEpisodesRouter;
