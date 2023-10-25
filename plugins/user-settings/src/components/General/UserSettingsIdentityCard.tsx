/*
 * Copyright 2022 The Backstage Authors
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
import { EntityRefLinks } from '@backstage/plugin-catalog-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useUserProfile } from '../useUserProfileInfo';

import { BackstageTheme } from '@backstage/theme';
import { makeStyles } from '@material-ui/core/styles';

import { vars } from '../../../../../packages/app/src/themes/variables';


const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    userEntity: {
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      marginBottom: '25px'
    },
    ownerLinkContainer: {
      background: `${theme.palette.type === 'dark' ? '#FFF' : '#FFF'
        }`,
      width: '67%',
      marginLeft: '82px',
      padding: '5px 10px 5px 8px',
      borderRadius: '12px',
      color:'red !important'

    },
    colorPrimary: {
      color: 'red !important'
    },
    linkContainer: {
      background: `${theme.palette.type === 'dark' ? '#FFF' : '#FFF'
        }`,
      width: '67%',
      marginLeft: '150px',
      padding: '5px 10px 5px 8px',
      borderRadius: '12px',

    },
    link: {
      marginLeft: '8px',
      color:'RGB(6, 11, 40)'

    },
    titulo: {
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      marginLeft: '23px',
      marginBottom: '10px'
    },
    card: {
      backgroundColor: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
      }`,

    },
  }));

const Contents = () => {
  const { backstageIdentity } = useUserProfile();
  const classes = useStyles();

  if (!backstageIdentity) {
    return <Typography>No Backstage Identity</Typography>;
  }

  return (
    <Grid
      container
      spacing={1}
      style={{ marginTop: '25px', marginLeft: '25px', marginBottom: '45px' }}
    >
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom
          className={classes.userEntity}>
          User Entity
          <div className={classes.linkContainer}>
            <EntityRefLinks
              entityRefs={[backstageIdentity.userEntityRef]}
              getTitle={ref => ref}
              className={classes.link}
            />
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1"
          className={classes.userEntity}>
          Ownership Entities
          <div className={classes.ownerLinkContainer}>
            <EntityRefLinks
              entityRefs={backstageIdentity.ownershipEntityRefs}
              getTitle={ref => ref}
              className={classes.link}
            />
          </div>
        </Typography>
      </Grid>
    </Grid>
  );
};

/** @public */
export const UserSettingsIdentityCard = () => {
  const classes = useStyles();

  return (
    <InfoCardSettings className={classes.card}
      title={
        <span className={classes.titulo}>
          Backstage Identity
        </span>
      }
    >
      <Contents />
    </InfoCardSettings>
  );
};
