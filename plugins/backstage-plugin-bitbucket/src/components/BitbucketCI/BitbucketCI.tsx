// .-- react --
import React from 'react';

// .-- material --
import { Content, Page } from '@backstage/core-components';
import { Grid } from '@material-ui/core';

// .-- components --
import {
  ReviewersCard,
  MergeRequestStats,
  MergeRequestsTable,
  /* IssuesTable,
  LanguagesCard,
  PipelinesTable,  */
} from '../widgets';

export const BitbucketCI = () => (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={6} direction="row" alignItems="stretch">
        <Grid item sm={12} md={6} lg={4}>
          <ReviewersCard />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <MergeRequestStats />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          {/* <LanguagesCard />  */}
        </Grid>
        <Grid item md={12}>
          <MergeRequestsTable />
        </Grid>
        <Grid item md={12}>
          {/* <PipelinesTable /> */}
        </Grid>
        <Grid item md={12}>
          {/* <IssuesTable /> */}
        </Grid>
      </Grid>
    </Content>
  </Page>
);