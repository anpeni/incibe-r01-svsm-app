/*
 * Copyright 2021 The Backstage Authors
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

import {
  Content,
  ContentHeader,
  Header,
  Page,
  SupportButton,
} from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { ImportInfoCard } from '../ImportInfoCard';
import { ImportStepper } from '../ImportStepper';
import AddBoxIcon from '@mui/icons-material/AddBox';

/**
 * The default catalog import page.
 *
 * @public
 */
export const DefaultImportPage = () => {
  const theme = useTheme();
  const configApi = useApi(configApiRef);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appTitle = configApi.getOptional('app.title') || 'Backstage';

  const contentItems = [
    <Grid item xs={12} md={4} lg={6} xl={6} style={{ position: 'relative' }}>
      <div style={{ width: '825px', position: 'fixed', right: '15px' }}>
        <ImportInfoCard />
      </div>
    </Grid>,

    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      xl={4}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        style={{
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '32px',
          marginLeft: '-10px',
          marginTop: '20px',
          marginBottom: '40px',
        }}
      >
        GitHub Pages Website
      </span>
      <div style={{ marginLeft: '15px' }}>
        <ImportStepper />
      </div>
    </Grid>,
  ];

  return (
    <div style={{ marginLeft: '60px' }}>
      <Page themeId="home">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1625px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '25px',
              marginLeft: '30px',
            }}
          >
            <AddBoxIcon
              style={{
                marginTop: '15px',
                transform: 'scale(1.8)',
                marginLeft: '10px',
              }}
            />
            <Header
              title="Add a new component"
              style={{
                color: '#FFF',
                textAlign: 'left',
                //marginTop: '10px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
              }}
            />
            <div
              style={{ right: '15px', marginTop: '15px', position: 'fixed' }}
            >
              <SupportButton>
                Start tracking your component in {appTitle} by adding it to the
                software catalog.
              </SupportButton>
            </div>
          </div>
          <Content>
            <div style={{ marginTop: '-20px' }}>
              <span
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '16px',
                  marginLeft: '15px',
                }}
              >
                Create new software components using standard templates
              </span>
            </div>
            <Grid
              container
              spacing={5}
              style={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {isMobile ? contentItems : contentItems.reverse()}
            </Grid>
          </Content>
        </div>
      </Page>
    </div>
  );
};
