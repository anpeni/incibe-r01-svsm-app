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
import { useSidebarOpenState } from '@backstage/core-components';
//import { InfoCard } from '@backstage/core-components';
//import Avatar from '@material-ui/core/Avatar';


/** @public */

const useStyles = makeStyles({
  developerText: {
    color: 'grey',
    fontSize: '10px',
  },
  sectionTitleOscuro: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.30)',
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: '0px',
    marginTop: '5px',
    marginBottom: '0px'
},
sectionTitleaClaro: {
    fontSize: '11px',
    color: '#000',
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: '0px',
    marginTop: '5px',
    marginBottom: '0px'
},
});
export const UserSettingsProfileNew = () => {
  const { profile, displayName } = useUserProfile();
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const isDarkMode = localStorage.getItem('theme') === 'neoris-dark';
  return (
    <>
    {isOpen ? (
    <div style={{ marginTop: '3px' , marginBottom: '-8px',marginLeft: '23px',  alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ margin: '10px' }}>
          <UserSettingsSignInAvatar size={40} />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '-17px', fontWeight: 'bold' }}>

        {isDarkMode ? (
              <span className={classes.sectionTitleOscuro}>
              DEVELOPER
              </span>
              ) : (
                <span className={classes.sectionTitleaClaro}>
                DEVELOPER
                </span>
              )}


          {profile.email && (
            <div style={{marginBottom: '8px' }}>
              {isDarkMode ? (
              <span style={{color:'white'}}>
              {displayName}
              </span>
              ) : (
                <span style={{color:'#000'}}>
                {displayName}
                </span>
              )}
            
            
            </div>
          )}
        </div>
      </div>

    </div>
    ) : (
      <div style={{ marginLeft: '17px', marginBottom:'10px', marginTop:'10px'}}>
      <UserSettingsSignInAvatar size={40} />
    </div>
      )}
      </>
  );
  
  
  
  
};
