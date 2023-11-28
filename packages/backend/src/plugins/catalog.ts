import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import {
  GithubDiscoveryProcessor,
  GithubOrgReaderProcessor,
} from '@backstage/plugin-catalog-backend-module-github';
import {
  ScmIntegrations,
  DefaultGithubCredentialsProvider,
} from '@backstage/integration';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env as any);
  const integrations = ScmIntegrations.fromConfig(env.config);
  const githubCredentialsProvider =
    DefaultGithubCredentialsProvider.fromIntegrations(integrations);
  builder.addProcessor(
    GithubDiscoveryProcessor.fromConfig(env.config, {
      logger: env.logger,
      githubCredentialsProvider,
    }),
    GithubOrgReaderProcessor.fromConfig(env.config, {
      logger: env.logger,
      githubCredentialsProvider,
    }),
  );
  builder.addEntityProvider(
    GithubEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      // optional: alternatively, use scheduler with schedule defined in app-config.yaml
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { hours: 24 },
        timeout: { minutes: 3 },
      }),
      // optional: alternatively, use schedule
      //scheduler: env.scheduler,
    }),
  );
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
