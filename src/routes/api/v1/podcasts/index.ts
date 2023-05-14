import express from 'express';
import PodcastEpisodesRouter from './episodes';
import podcastChannelRouter from './channels/index';
const PodcastRouter = express.Router({ mergeParams: true });

PodcastRouter.use('/episodes', PodcastEpisodesRouter);
PodcastRouter.use('/channels', podcastChannelRouter);

export default PodcastRouter;
