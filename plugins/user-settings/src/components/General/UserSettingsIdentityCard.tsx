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

const Contents = () => {
  const { backstageIdentity } = useUserProfile();

  if (!backstageIdentity) {
    return <Typography>No Backstage Identity</Typography>;
  }

  return (
    <Grid container spacing={1} style={{ marginTop: '25px', marginLeft: '25px', marginBottom: '45px' }}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom
          style={{
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            marginBottom: '25px'
          }}>
          User Entity
          <div style={{
            background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
            width: '67%',
            marginLeft: '150px',
            padding: '5px 10px 5px 8px',
            borderRadius: '12px',

          }}>
          <EntityRefLinks
            entityRefs={[backstageIdentity.userEntityRef]}
            getTitle={ref => ref}
            style={{ marginLeft: '8px' }}
          />
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#FFF',
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}>
          Ownership Entities
          <div style={{
            background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
            width: '67%',
            marginLeft: '82px',
            padding: '5px 10px 5px 8px',
            borderRadius: '12px',

          }}>
            <EntityRefLinks
              entityRefs={backstageIdentity.ownershipEntityRefs}
              getTitle={ref => ref}
              style={{
                marginLeft: '8px',
              }}
            />
          </div>
        </Typography>
      </Grid>
    </Grid>
  );
};

/** @public */
export const UserSettingsIdentityCard = () => (
  <InfoCardSettings
    title={<span style={{
      color: '#FFF',
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      marginLeft: '23px',
      marginBottom: '10px'
    }}>
      Backstage Identity</span>}
  >
    <Contents
    />
  </InfoCardSettings>
);
