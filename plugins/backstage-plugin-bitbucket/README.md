# Backstage Bitbucket Plugin

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/backstage-plugin-bitbucket](http://localhost:3000/backstage-plugin-bitbucket).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Setup

1. If you have a standalone app (you didn't clone this repo), then do

```bash
# From your Backstage root directory
cd packages/app
yarn add @neoris/backstage-plugin-bitbucket
```

2. Add a new Bitbucket tab to the entity page.

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import { isBitbucketAvailable, EntityBitbucketContent } from '@neoris/backstage-plugin-bitbucket';

// Farther down at the serviceEntityPage declaration
const serviceEntityPage = (
  <EntityLayout>
    {/* Place the following section where you want the tab to appear */}
    <EntityLayout.Route if={isBitbucketAvailable} path="/bitbucket" title="Bitbucket">
       <EntityBitbucketContent />
    </EntityLayout.Route>
  </EntityLayout>
);
```

3. Add the Bitbucket cards to the Overview tab on the entity page(Optional).

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import {
  isBitbucketAvailable,
  EntityBitbucketContent,
  EntityBitbucketLanguageCard,
  EntityBitbucketContributorsCard,
  EntityBitbucketMergeRequestsTable,
  EntityBitbucketMergeRequestStatsCard,
  EntityBitbucketPipelinesTable
} from '@neoris/backstage-plugin-bitbucket';

//Farther down at the overviewContent declaration
//You can add only selected widgets or all of them.
const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    <EntitySwitch>
      <EntitySwitch.Case if={isBitbucketAvailable}>
        <Grid item md={6}>
          <EntityBitbucketContributorsCard />
          <EntityBitbucketLanguageCard />
          <EntityBitbucketMergeRequestStatsCard />
          <EntityBitbucketPipelinesTable />
          <EntityBitbucketMergeRequestsTable />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </Grid>
);
```

4. Add integration:
In `app-config.yaml` add the integration for bitbuccket:
```
integrations:
  bitbucketCloud:
    - username: ${BITBUCKET_CLOUD_USERNAME}
      appPassword: ${BITBUCKET_CLOUD_APP_PASSWORD}
proxy:
  '/bitbucketci':
    target: https://api.bitbucket.org/2.0/
    headers:
      # Basic base64(${BITBUCKET_CLOUD_USERNAME}:${BITBUCKET_CLOUD_APP_PASSWORD})
      Authorization: Basic base64(${BITBUCKET_CLOUD_USERNAME}:${BITBUCKET_CLOUD_APP_PASSWORD})
bitbucketci:
  baseUrl: https://api.bitbucket.org/2.0/
```

5. Add a `bitbucket.org/repository-slug` annotation to your respective `catalog-info.yaml` files, on the [format](https://backstage.io/docs/architecture-decisions/adrs-adr002#format)

```yaml
# Example catalog-info.yaml entity definition file
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
      bitbucket.org/repository-slug: 'repository-slug' # {workspace_slug}/{repo_slug}
      or
      bitbucket.org/repository-id: 'repository-id' # {workspace_uuid}/{repo_uuid}
spec:
  type: service
  # ...
```

**Note:** `spec.type` can take values in ['website','library','service'] but to render GitLab Entity, Catalog must be of type `service`

## Features

- List top 20 builds for a project
- List top 20 Merge Requests for a project
- List top 20 Issues for a project
- View Contributors for a project
- View Languages used for a project
- View Pipeline status for a project
- Works for both project and personal tokens
- Pagination for builds
- Pagination for Merge Requests
- Merge Requests Statistics


+ List effective default reviewers

GET /2.0/repositories/{workspace}/{repo_slug}/effective-default-reviewers

https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests/#api-repositories-workspace-repo-slug-effective-default-reviewers-get

```json
$ curl https://bitbucket.org/!api/2.0/repositories/{workspace_slug}/{repo_slug}/effective-default-reviewers?page=1&pagelen=20
{
    "pagelen": 20,
    "values": [
        {
            "user": {
                "display_name": "Patrick Wolf",
                "uuid": "{9565301a-a3cf-4b5d-88f4-dd6af8078d7e}"
            },
            "reviewer_type": "project",
            "type": "default_reviewer",
        },
        {
            "user": {
                "display_name": "Davis Lee",
                "uuid": "{f0e0e8e9-66c1-4b85-a784-44a9eb9ef1a6}"
            },
            "reviewer_type": "repository",
            "type": "default_reviewer",
        }
    ],
    "page": 1,
    "size": 2
}
```
```curl

echo -n 'raulmartind:ATBBVPqGe8bcq968EM2EnUNh8V7eAD034584' | base64
    cmF1bG1hcnRpbmQ6QVRCQlZQcUdlOGJjcTk2OEVNMkVuVU5oOFY3ZUFEMDM0NTg0

curl --request GET \
 --url 'https://api.bitbucket.org/2.0/repositories/neoris-global/dso.backstage/commits' \
 --user 'raulmartind:ATBBVPqGe8bcq968EM2EnUNh8V7eAD034584' \
 --header 'Accept: application/json'

 curl --request GET \
 --url 'https://api.bitbucket.org/2.0/repositories/neoris-global/dso.backstage/commits' \
 --header 'Authorization: Basic cmF1bG1hcnRpbmQ6QVRCQlZQcUdlOGJjcTk2OEVNMkVuVU5oOFY3ZUFEMDM0NTg0' \
 --header 'Accept: application/json'

```

