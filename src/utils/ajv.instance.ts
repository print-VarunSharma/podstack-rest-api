import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import podcastChannelSchema from '../schema/podcasts/podcasts.channels.json';
import podcastEpisodeSchema from '../schema/podcasts/podcasts.episodes.json';
import narrationsSchema from '../schema/narrations.json';
import groupsSchema from '../schema/groups.json';
import projectsSchema from '../schema/projects/projects.json';
import cmsIntegrationSettingsSchema from '../schema/cmsIntegrationSettings/cmsIntegrationSettings.json';

import { SCHEMA_NAMES } from '../types/schema/schema.constants';

function getInstance() {
    const ajvInstance = new Ajv({ allErrors: true });
    addFormats(ajvInstance);

    ajvInstance.addSchema(podcastChannelSchema, SCHEMA_NAMES.PODCAST_CHANNELS_POST);
    ajvInstance.addSchema(podcastEpisodeSchema, SCHEMA_NAMES.PODCAST_EPISODES_POST);
    ajvInstance.addSchema(narrationsSchema, SCHEMA_NAMES.NARRATIONS_POST);
    ajvInstance.addSchema(groupsSchema, SCHEMA_NAMES.GROUPS_POST);
    ajvInstance.addSchema(projectsSchema, SCHEMA_NAMES.PROJECTS_POST);
    ajvInstance.addSchema(cmsIntegrationSettingsSchema, SCHEMA_NAMES.CMS_INTEGRATION_SETTINGS_POST);

    return ajvInstance;
}
export const ajvInstance = getInstance();
