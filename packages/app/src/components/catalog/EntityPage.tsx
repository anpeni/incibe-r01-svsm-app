/*
 * Copyright 2020 The Backstage Authors
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
 * limitations under the License.
 */

import React from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  EntityApiDefinitionCard,
  EntityConsumedApisCard,
  EntityConsumingComponentsCard,
  EntityHasApisCard,
  EntityProvidedApisCard,
  EntityProvidingComponentsCard,
} from '@internal/plugin-api-docs';
import {
  EntityAboutCard,
  EntityDependsOnComponentsCard,
  EntityDependsOnResourcesCard,
  EntityHasComponentsCard,
  EntityHasResourcesCard,
  EntityHasSubcomponentsCard,
  EntityHasSystemsCard,
  EntityLayout,
  EntityLinksCard,
  EntitySwitch,
  EntityOrphanWarning,
  EntityProcessingErrorsPanel,
  isComponentType,
  isKind,
  hasCatalogProcessingErrors,
  isOrphan,
} from '@internal/plugin-catalog';
import {
  isGithubActionsAvailable,
  EntityGithubActionsContent,
} from '@backstage/plugin-github-actions';
import {
  EntityUserProfileCard,
  EntityGroupProfileCard,
  EntityMembersListCard,
  EntityOwnershipCard,
} from '@backstage/plugin-org';
import { EntityTechdocsContent } from '@backstage/plugin-techdocs';
import { EmptyState } from '@backstage/core-components';
import {
  Direction,
  EntityCatalogGraphCard,
} from '@backstage/plugin-catalog-graph';
import {
  RELATION_API_CONSUMED_BY,
  RELATION_API_PROVIDED_BY,
  RELATION_CONSUMES_API,
  RELATION_DEPENDENCY_OF,
  RELATION_DEPENDS_ON,
  RELATION_HAS_PART,
  RELATION_PART_OF,
  RELATION_PROVIDES_API,
} from '@backstage/catalog-model';

import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';

// .--  plugin-sonarqube --
import {
  EntitySonarQubeCard,
  isSonarQubeAvailable,
} from '@backstage/plugin-sonarqube';

// .--  plugin-grafana --
import {
  EntityGrafanaDashboardsCard,
  isDashboardSelectorAvailable,
  EntityOverviewDashboardViewer,
} from '@k-phoen/backstage-plugin-grafana';

// .--  plugin-prometheus --
import { EntityPrometheusContent } from '@roadiehq/backstage-plugin-prometheus';

// .--  plugin-todo --
import { EntityTodoContent } from '@backstage/plugin-todo';

// .--  plugin-bitbucket --
import {
  isBitbucketAvailable,
  EntityBitbucketContent,
} from '@internal/backstage-plugin-bitbucket';

// .--  plugin-kubernete --
import { EntityKubernetesContent } from '@backstage/plugin-kubernetes';

// plugin-jenkins
import {
  EntityJenkinsContent,
  EntityLatestJenkinsRunCard,
  isJenkinsAvailable,
} from '@backstage/plugin-jenkins';

// .--  plugin-tekton --
import {
  EntityTektonPipelinesContent,
  isTektonCiAvailable,
} from '@jquad-group/plugin-tekton-pipelines';

// .--  plugin-circleci --
import {
  EntityCircleCIContent,
  isCircleCIAvailable,
} from '@backstage/plugin-circleci';

// .--  plugin-weave-flux --
import {
  EntityFluxGitRepositoriesCard,
  EntityFluxHelmReleasesCard,
  EntityFluxOCIRepositoriesCard,
  EntityFluxKustomizationsCard,
  EntityFluxHelmRepositoriesCard,
  EntityFluxDeploymentsCard,
  EntityFluxSourcesCard,
  EntityFluxImagePoliciesCard,
} from '@weaveworksoss/backstage-plugin-flux';
import {
  EntityAzurePipelinesContent,
  isAzurePipelinesAvailable,
  isAzureDevOpsAvailable,
  EntityAzurePullRequestsContent,
  EntityAzureGitTagsContent,
  EntityAzureReadmeCard
} from '@backstage/plugin-azure-devops';


const techdocsContent = (
  <EntityTechdocsContent>
    <TechDocsAddons>
      <ReportIssue />
    </TechDocsAddons>
  </EntityTechdocsContent>
);

const cicdContent = (
  
  <EntitySwitch>
    <EntitySwitch.Case if={isCircleCIAvailable}>
      <EntityCircleCIContent />
    </EntitySwitch.Case>

    <EntitySwitch.Case>
      <EmptyState
        title="No CI/CD available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntitySwitch.Case>
  </EntitySwitch>
);

const GithubActionsContent = (
  <EntitySwitch>
     <EntitySwitch.Case 
     //if={isGithubActionsAvailable}
     >
      <EntityGithubActionsContent />
    </EntitySwitch.Case> 

    <EntitySwitch.Case>
      <EmptyState
        title="No CI/CD available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntitySwitch.Case>
  </EntitySwitch>
);

const AzurePipelinesContent = (
  
  <EntitySwitch>
    <EntitySwitch.Case if={isAzureDevOpsAvailable}>
        <EntityAzurePipelinesContent defaultLimit={25} />
    </EntitySwitch.Case>

    <EntitySwitch.Case>
      <EmptyState
        title="No CI/CD available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntitySwitch.Case>
  </EntitySwitch>
);

const entityWarningContent = (
  <>
    <EntitySwitch>
      <EntitySwitch.Case if={isOrphan}>
        <Grid item xs={12}>
          <EntityOrphanWarning />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>

    <EntitySwitch>
      <EntitySwitch.Case if={hasCatalogProcessingErrors}>
        <Grid item xs={12}>
          <EntityProcessingErrorsPanel />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </>
);

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>

    {/* Sonar Card */}
    <EntitySwitch>
      <EntitySwitch.Case if={isSonarQubeAvailable}>
        <Grid item md={6}>
          <EntitySonarQubeCard variant="gridItem" />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>

    {/* Grafana card */}

    <Grid item md={6}>
      <EntityOverviewDashboardViewer />
    </Grid>

    <Grid item md={6} xs={12}>
      <EntityCatalogGraphCard variant="gridItem" height={400} />
    </Grid>
    {/* <Grid item md={12}>
      <EntityFluxHelmRepositoriesCard />
    </Grid>
    <Grid item md={12}>
      <EntityFluxGitRepositoriesCard />
    </Grid>
    <Grid item md={12}>
      <EntityFluxSourcesCard />
    </Grid> */}
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>

    <Grid container spacing={3} alignItems="stretch">
    <EntitySwitch>
      <EntitySwitch.Case if={isAzureDevOpsAvailable}>
        <Grid item md={6}>
          <EntityAzureReadmeCard maxHeight={350} />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </Grid>
    {/* <Grid item md={8} xs={12}>
      <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid> */}
  </Grid>
);

const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <React.Fragment>
        {overviewContent}
        <EntitySwitch>
          <EntitySwitch.Case if={isJenkinsAvailable}>
            <Grid item sm={6}>
              <EntityLatestJenkinsRunCard branch="" variant="gridItem" />
            </Grid>
          </EntitySwitch.Case>
        </EntitySwitch>
      </React.Fragment>
    </EntityLayout.Route>

    <EntityLayout.Route
      path="/tekton-pipelines-plugin"
      title="Tekton Pipelines"
    >
      <EntitySwitch>
        <EntitySwitch.Case if={e => Boolean(isTektonCiAvailable(e))}>
          <EntityTektonPipelinesContent />
        </EntitySwitch.Case>
        <EntitySwitch.Case>
          <EmptyState
            title="No Tekton Pipelines available for this entity"
            missing="info"
            description="You need to add the annotation 'tektonci/build-namespace' to your component if you want to enable the Tekton Pipelines for it."
          />
        </EntitySwitch.Case>
      </EntitySwitch>
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="Circle CI">
      {cicdContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/azure-pipelines" title="Azure Pipelines">
      {AzurePipelinesContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/github-content" title="Github Discovery">
      {GithubActionsContent}
    </EntityLayout.Route>

    <EntityLayout.Route if={isJenkinsAvailable} path="/jenkins" title="Jenkins">
      <EntityJenkinsContent />
    </EntityLayout.Route>
    <EntityLayout.Route if={isAzureDevOpsAvailable} path="/pull-requests" title="Azure PR">
      <EntityAzurePullRequestsContent defaultLimit={25} />
    </EntityLayout.Route>
    {/* <EntityLayout.Route if={isAzureDevOpsAvailable} path="/git-tags" title="Git Tags">
      <EntityAzureGitTagsContent />
    </EntityLayout.Route> */}
    {/* <EntityLayout.Route
      path="/git"
      title="Git"
    >
<EmptyState
        title="No Git available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable Git for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntityLayout.Route> */}
    <EntityLayout.Route
      if={isBitbucketAvailable}
      path="/bitbucket"
      title="Bitbucket"
    >
      <EntityBitbucketContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/api" title="API">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityProvidedApisCard />
        </Grid>
        <Grid item md={6}>
          <EntityConsumedApisCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000} />
    </EntityLayout.Route>
    {/* <EntityLayout.Route path="/weaveworks-flux" title="Weave Flux">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={12}>
          <EntityFluxHelmRepositoriesCard />
        </Grid>
        <Grid item md={12}>
          <EntityFluxGitRepositoriesCard />
        </Grid>
        <Grid item md={12}>
          <EntityFluxSourcesCard />
        </Grid>
      </Grid>
    </EntityLayout.Route> */}
    <EntityLayout.Route path="/prometheus" title="Prometheus">
      <EntityPrometheusContent />
    </EntityLayout.Route>
  </EntityLayout>
);

const websiteEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="Circle CI">
      {cicdContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/azure-pipelines" title="Azure Pipelines">
      {AzurePipelinesContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/github-content" title="Github Discovery">
      {GithubActionsContent}
    </EntityLayout.Route>
    {/* <EntityLayout.Route path="/weaveworks-flux" title="Weave Flux">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={12}>
          <EntityFluxHelmRepositoriesCard />
        </Grid>
        <Grid item md={12}>
          <EntityFluxGitRepositoriesCard />
        </Grid>
        <Grid item md={12}>
          <EntityFluxSourcesCard />
        </Grid>
      </Grid>
    </EntityLayout.Route> */}
    <EntityLayout.Route if={isJenkinsAvailable} path="/jenkins" title="Jenkins">
      <EntityJenkinsContent />
    </EntityLayout.Route>
    <EntityLayout.Route if={isAzureDevOpsAvailable} path="/pull-requests" title="Azure PR">
      <EntityAzurePullRequestsContent defaultLimit={25} />
    </EntityLayout.Route>
    {/* <EntityLayout.Route if={isAzureDevOpsAvailable} path="/git-tags" title="Git Tags">
      <EntityAzureGitTagsContent />
    </EntityLayout.Route> */}
    {/* <EntityLayout.Route
      path="/git"
      title="Git"
    >
      <EmptyState
        title="No Git available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable Git for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntityLayout.Route> */}
    <EntityLayout.Route
      if={isBitbucketAvailable}
      path="/bitbucket"
      title="Bitbucket"
    >
      <EntityBitbucketContent />
    </EntityLayout.Route>

    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000} />
    </EntityLayout.Route>

    <EntityLayout.Route path="/prometheus" title="Prometheus">
      <EntityPrometheusContent />
    </EntityLayout.Route>
  </EntityLayout>
);

/**
 * NOTE: This page is designed to work on small screens such as mobile devices.
 * This is based on Material UI Grid. If breakpoints are used, each grid item must set the `xs` prop to a column size or to `true`,
 * since this does not default. If no breakpoints are used, the items will equitably share the available space.
 * https://material-ui.com/components/grid/#basic-grid.
 */

const defaultEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    {/* <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route> */}
  </EntityLayout>
);

const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType('service')}>
      {serviceEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case if={isComponentType('website')}>
      {websiteEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
const apiPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard />
        </Grid>
        {/* Sonar Card */}
        <EntitySwitch>
          <EntitySwitch.Case if={isSonarQubeAvailable}>
            <Grid item md={6}>
              <EntitySonarQubeCard variant="gridItem" />
            </Grid>
          </EntitySwitch.Case>
        </EntitySwitch>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={4} xs={12}>
          <EntityLinksCard />
        </Grid>
        <Grid container item md={12}>
          <Grid item md={6}>
            <EntityProvidingComponentsCard />
          </Grid>
          <Grid item md={6}>
            <EntityConsumingComponentsCard />
          </Grid>
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/definition" title="Definition">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EntityApiDefinitionCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    {/* <EntityLayout.Route path="/todo" title="Todo">
      <EntityTodoContent />
    </EntityLayout.Route> */}
  </EntityLayout>
);

const userPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item xs={12} md={6}>
          <EntityUserProfileCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityOwnershipCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

const groupPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item xs={12} md={6}>
          <EntityGroupProfileCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityOwnershipCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityMembersListCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityLinksCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

const systemPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={4} xs={12}>
          <EntityLinksCard />
        </Grid>
        <Grid item md={8}>
          <EntityHasComponentsCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityHasApisCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityHasResourcesCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route path="/diagram" title="Diagram">
      <EntityCatalogGraphCard
        variant="gridItem"
        direction={Direction.TOP_BOTTOM}
        title="System Diagram"
        height={700}
        relations={[
          RELATION_PART_OF,
          RELATION_HAS_PART,
          RELATION_API_CONSUMED_BY,
          RELATION_API_PROVIDED_BY,
          RELATION_CONSUMES_API,
          RELATION_PROVIDES_API,
          RELATION_DEPENDENCY_OF,
          RELATION_DEPENDS_ON,
        ]}
        unidirectional={false}
      />
    </EntityLayout.Route>
  </EntityLayout>
);

const domainPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={6}>
          <EntityHasSystemsCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage} />
    <EntitySwitch.Case if={isKind('api')} children={apiPage} />
    <EntitySwitch.Case if={isKind('group')} children={groupPage} />
    <EntitySwitch.Case if={isKind('user')} children={userPage} />
    <EntitySwitch.Case if={isKind('system')} children={systemPage} />
    <EntitySwitch.Case if={isKind('domain')} children={domainPage} />

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
