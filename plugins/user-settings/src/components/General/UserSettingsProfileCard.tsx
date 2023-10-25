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

import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { UserSettingsSignInAvatar } from './UserSettingsSignInAvatar';
import { UserSettingsMenu } from './UserSettingsMenu';
import { useUserProfile } from '../useUserProfileInfo';
import { InfoCardSettings } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { vars } from '../../../../../packages/app/src/themes/variables';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    titulo: {
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      marginLeft: '23px'

    },
    card: {
      backgroundColor: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
      }`,

    },
    rol: {
      marginBottom: '3px',
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
    },
    nombre: {
      marginBottom: '3px',
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
    },
    mail: {

      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
        }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
    },
  }));



/** @public */
export const UserSettingsProfileCard = () => {
  const { profile, displayName } = useUserProfile();
  const classes = useStyles();

  return (
    <InfoCardSettings className={classes.card} variant="gridItem" title={<span className={classes.titulo}>Profile</span>}>
      <Grid container spacing={6} style={{ marginTop: '-8px' }}>
        <Grid item style={{ marginLeft: '28px' }}>
          <UserSettingsSignInAvatar size={96} />
        </Grid>
        <Grid item xs={12} sm container style={{ marginTop: '-2px' }}>
          <Grid item xs container direction="column" spacing={2} style={{ marginLeft: '-30px' }}>
            <Grid item xs>
              <Typography variant="subtitle1" gutterBottom
                className={classes.rol}>
                DEVELOPER
              </Typography>
              <Typography variant="subtitle1" gutterBottom
                className={classes.nombre}>
                {displayName}
              </Typography>
              {profile.email && (
                <Typography variant="body2" color="textSecondary"
                className={classes.mail}>
                  {profile.email}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item style={{ marginRight: '-5px', marginTop: '-80px' }}>
            <UserSettingsMenu />
          </Grid>
        </Grid>
      </Grid>
    </InfoCardSettings>
  );
};
