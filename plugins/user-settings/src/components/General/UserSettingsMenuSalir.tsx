import React from 'react';
import { IconButton } from '@material-ui/core';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import SignOutIcon from '@material-ui/icons/MeetingRoom';
import { identityApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { PoweroffOutlined } from '@ant-design/icons';
import { Typography } from '@material-ui/core';
import { useSidebarOpenState } from '@backstage/core-components';


/** @public */
export const UserSettingsMenuSalir = () => {
  const errorApi = useApi(errorApiRef);
  const identityApi = useApi(identityApiRef);
  const { isOpen } = useSidebarOpenState();

  const handleSignOut = () => {
    identityApi.signOut().catch(error => errorApi.post(error));
  };

  return (
    <>
      {isOpen ? (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <IconButton
          data-testid="user-settings-menu"
          aria-label="more"
          onClick={handleSignOut}
        >
          {/* @ts-ignore */}
          <PoweroffOutlined />
        </IconButton>
        
      </div>
      <div>            
        <Typography variant="subtitle1">
        Cerrar sesión
      </Typography></div>
    </div>
    ) : (
      <div >
        <IconButton
        
          data-testid="user-settings-menu"
          aria-label="more"
          onClick={handleSignOut}
        >
          {/* @ts-ignore */}
          <PoweroffOutlined />
        </IconButton>        
    </div>
      )}
      </>
  );
};
