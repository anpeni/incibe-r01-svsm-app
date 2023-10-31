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

import { InfoCardSettings } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { Chip, Typography } from '@material-ui/core';
import React from 'react';
import { catalogImportApiRef } from '../../api';
import { useCatalogFilename } from '../../hooks';

/**
 * Props for {@link ImportInfoCard}.
 *
 * @public
 */
export interface ImportInfoCardProps {
  exampleLocationUrl?: string;
  exampleRepositoryUrl?: string;
}

import { BackstageTheme } from '@backstage/theme';
import { makeStyles } from '@material-ui/core/styles';

import { vars } from '../../../../../packages/app/src/themes/variables';


const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    card: {
      backgroundColor: `${theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
        }`,
    },
    title: {
      display: 'block',
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.white
        : vars.light.fontColor.black
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 800,
      lineHeight: '32px',
      marginLeft: '20px',
      marginTop: '5px',
    },
    url: {
      display: 'block',
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.white
        : vars.light.fontColor.black
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 800,
      lineHeight: '32px',
      marginLeft: '20px',
      marginTop: '5px',
    },
    link: {
      display: 'block',
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.white
        : vars.light.fontColor.black
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '32px',
      marginLeft: '20px',

    },
    wizzard: {
      display: 'block',
      color: `${theme.palette.type === 'dark'
        ? vars.dark.fontColor.white
        : vars.light.fontColor.black
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 800,
      lineHeight: '32px',
      marginLeft: '20px',
      marginTop: '20px',
    },
  }));

/**
 * Shows information about the import process.
 *
 * @public
 */
export const ImportInfoCard = (props: ImportInfoCardProps) => {
  const {
    exampleLocationUrl = 'https://github.com/backstage/backstage/blob/master/catalog-info.yaml',
    exampleRepositoryUrl = 'https://github.com/backstage/backstage',
  } = props;

  const configApi = useApi(configApiRef);
  const appTitle = configApi.getOptional('app.title') || 'Backstage';
  const catalogImportApi = useApi(catalogImportApiRef);

  const hasGithubIntegration = configApi.has('integrations.github');

  const catalogFilename = useCatalogFilename();
  const classes = useStyles();

  return (
    <InfoCardSettings className={classes.card}
      title=""
      //titleTypographyProps={{ component: 'h3' }}
      deepLink={{
        title: 'Learn more about the Software Catalog',
        link: 'https://backstage.io/docs/features/software-catalog/',
      }}
    >
      <span className={classes.card}   >
        Register an existing component
      </span>

      <span className={classes.url}     >
        Enter the URL to your source code repository to add it to {appTitle}
      </span>
      <span style={{ marginTop: '20px', }}
        className={classes.link}     >
        Link to an existing entity file
      </span>
      <span className={classes.link}   >
        Example: <code>{exampleLocationUrl}</code>
      </span>

      <span className={classes.wizzard}>
        The wizard analyzes the file, previews the entities, and adds them to
        the {appTitle} catalog.
      </span>

      {hasGithubIntegration && (
        <>
          <Typography component="h4" variant="h6">
            Link to a repository{' '}
            <Chip label="GitHub only" variant="outlined" size="small" />
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" paragraph>
            Example: <code>{exampleRepositoryUrl}</code>
          </Typography>
          <Typography variant="body2" paragraph>
            The wizard discovers all <code>{catalogFilename}</code> files in the
            repository, previews the entities, and adds them to the {appTitle}{' '}
            catalog.
          </Typography>
          {catalogImportApi.preparePullRequest && (
            <Typography variant="body2" paragraph>
              If no entities are found, the wizard will prepare a Pull Request
              that adds an example <code>{catalogFilename}</code> and prepares
              the {appTitle} catalog to load all entities as soon as the Pull
              Request is merged.
            </Typography>
          )}
        </>
      )}
    </InfoCardSettings>
  );
};
