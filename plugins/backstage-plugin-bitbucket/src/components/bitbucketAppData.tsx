/*
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *
 * limitations under the License.
 */

import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useApi } from '@backstage/core-plugin-api';
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import {
  parseLocationRef,
  ANNOTATION_LOCATION,
  ANNOTATION_SOURCE_LOCATION,
} from '@backstage/catalog-model';

// .-- Data constants --
export const BITBUCKET_ANNOTATION_REPOSITORY_UUID = 'bitbucket.org/repository-uuid'; // workspace_uuid/repsitory_uuid
export const BITBUCKET_ANNOTATION_REPOSITORY_SLUG = 'bitbucket.org/repository-slug'; // workspace_slug/repsitory_slug
export const BASE_URL = 'https://api.bitbucket.org/2.0/';
export const URL_REVIEWERS = 'https://bitbucket.org/{{repository_slug}}/admin/pullrequests/reviewers/';
export const DEFAULT_PROXY_PATH = '/bitbucketci';
const defaultBitbucketIntegration = {
	hostname: 'api.bitbucket.org',
	baseUrl: BASE_URL,
};

// .-- Data Entity --
export const isBitbucketUUIDAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[BITBUCKET_ANNOTATION_REPOSITORY_UUID]);

export const isBitbucketSlugAnnotationAvailable = (entity: Entity) =>
	Boolean(entity.metadata.annotations?.[BITBUCKET_ANNOTATION_REPOSITORY_SLUG]);

export const isBitbucketAvailable = (entity: Entity) =>
isBitbucketUUIDAnnotationAvailable(entity) || isBitbucketSlugAnnotationAvailable(entity)
  
export const useEntityBitbucketScmIntegration = () => {
	const { entity } = useEntity();
	const integrations = useApi(scmIntegrationsApiRef);
	if (!entity) {
	  return defaultBitbucketIntegration;
	}
  
	let location = entity.metadata.annotations?.[ANNOTATION_SOURCE_LOCATION];
  
	if (!location) {
	  location = entity.metadata.annotations?.[ANNOTATION_LOCATION];
	}
  
	const { target } = parseLocationRef(location || '');
  
	const scm = integrations.bitbucketCloud.byUrl(target);
	if (scm) {
	  return {
			hostname: scm.config.host,
			baseUrl: scm.config.apiBaseUrl,
	  };
	}
	return defaultBitbucketIntegration;
};

export const bitbucketCloudAppUUID = () => {
	const { entity } = useEntity();

	const repository_uuid =
		entity.metadata.annotations?.[BITBUCKET_ANNOTATION_REPOSITORY_UUID] ?? '';

	return { repository_uuid };
};

export const bitbucketCloudAppSlug = () => {
	const { entity } = useEntity();

	const repository_slug =
		entity.metadata.annotations?.[BITBUCKET_ANNOTATION_REPOSITORY_SLUG] ?? '';

	return { repository_slug };
};
