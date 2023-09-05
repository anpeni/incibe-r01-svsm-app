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
//import { UserSettingsMenu } from './UserSettingsMenu';
import { UserSettingsMenuSalir } from './UserSettingsMenuSalir';
import { useUserProfile } from '../useUserProfileInfo';
//import { InfoCard } from '@backstage/core-components';
//import Avatar from '@material-ui/core/Avatar';
/** @public */
export const UserSettingsProfileNew = () => {
  const { profile, displayName } = useUserProfile();

  return (
    <div style={{ marginTop: '25px' , alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <UserSettingsSignInAvatar size={50} />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="subtitle1">
              {displayName}
            </Typography>
          </div>
          {profile.email && (
            <div style={{ color: 'textSecondary', marginBottom: '8px' }}>
              <Typography variant="body2" color="textSecondary">
                {profile.email}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '5px', textAlign: 'center' }}> {/* Añadido textAlign: 'center' */}
        <UserSettingsMenuSalir />
      </div>
    </div>
  );
  
  
  
  
};
