import express, { Application, Request, Response } from 'express';
const V1Router = express.Router();
import UserRouter from './users/index';
import NarrationRouter from './narrations/index';
import PodcastRouter from './podcasts';
import CampaignsRouter from './campaigns';
import GroupsRouter from './groups';
import ProjectsRouter from './projects';
import CmsIntegrationSettingsRouter from './cmsIntegrationSettings';

V1Router.use('/users', UserRouter);
V1Router.use('/narrations', NarrationRouter);
V1Router.use('/podcasts', PodcastRouter);
V1Router.use('/campaigns', CampaignsRouter);
V1Router.use('/groups', GroupsRouter);
V1Router.use('/projects', ProjectsRouter);
V1Router.use('/cms-integration-settings', CmsIntegrationSettingsRouter);

export default V1Router;
