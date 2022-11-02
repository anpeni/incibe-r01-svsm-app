// .-- backstage --
import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { readBitbucketCloudIntegrationConfigs } from '@backstage/integration';

// .-- route --
import { rootRouteRef } from './routes';

// .-- api --
import { configApiRef, createApiFactory, discoveryApiRef } from '@backstage/core-plugin-api';
import { BitbucketCIApiRef, BitbucketCIClient } from './api';

export const bitbucketPlugin = createPlugin({
  id: 'bitbucketci',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: BitbucketCIApiRef,
      deps: { configApi: configApiRef, discoveryApi: discoveryApiRef },
      factory: ({ configApi, discoveryApi }) => {
        const integration = readBitbucketCloudIntegrationConfigs(
          configApi.getOptionalConfigArray('integrations.bitbucketCloud') ?? [],
        );
        return new BitbucketCIClient({
          discoveryApi,
          baseUrl: configApi.getOptionalString('bitbucketci.baseUrl'),
          configBibucket:  integration.length === 0 ? integration[0] : undefined
        })
      }
    }),
  ],
});

export const BitbucketPage = bitbucketPlugin.provide(
  createRoutableExtension({
    name: 'BitbucketPage',
    component: () => import('./components/widgets/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const EntityBitbucketContent = bitbucketPlugin.provide(
  createRoutableExtension({
    name: 'EntityBitbucketContent',
    component: () => import('./Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

/* export const EntityBitbucketReviewersCard = bitbucketPlugin.provide(
  createComponentExtension({
    name: 'EntityBitbucketReviewersCard',
    component: {
      lazy: () => import('./components/widgets/index').then((m) => m.ReviewersCard),
    },
  })
); */
