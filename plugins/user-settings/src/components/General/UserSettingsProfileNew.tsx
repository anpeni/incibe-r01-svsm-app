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
import { UserSettingsSignInAvatar } from './UserSettingsSignInAvatar';
import { UserSettingsSalir } from './UserSettingsSalir';
import { UserSettingsMenuSalir } from './UserSettingsMenuSalir';
import { useUserProfile } from '../useUserProfileInfo';
import { makeStyles} from '@material-ui/core';
//import { InfoCard } from '@backstage/core-components';
//import Avatar from '@material-ui/core/Avatar';


/** @public */

const useStyles = makeStyles({
  developerText: {
    color: 'grey',
    fontSize: '10px',
  },
});
export const UserSettingsProfileNew = () => {
  const { profile, displayName } = useUserProfile();
  const classes = useStyles();
  return (
    <div style={{ marginTop: '3px' , marginBottom: '-8px',marginLeft: '7px',  alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <UserSettingsSignInAvatar size={40} />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-17px', fontWeight: 'bold' }}>

            <span className={classes.developerText}>
              DEVELOPER
            </span>

          {profile.email && (
            <div style={{marginBottom: '8px' }}>
              <span >
              {displayName}
              </span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
  
  
  
  
};
