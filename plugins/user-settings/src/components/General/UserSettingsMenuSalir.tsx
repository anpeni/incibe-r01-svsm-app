import React from 'react';
import { IconButtonMod } from '@internal/material-ui-core';
import { identityApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { PoweroffOutlined } from '@ant-design/icons';
import { Typography } from '@material-ui/core';
import { useSidebarOpenState } from '@internal/core-components';


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
        <IconButtonMod
          data-testid="user-settings-menu"
          aria-label="more"
          onClick={handleSignOut}
        >
          {/* @ts-ignore */}
          <PoweroffOutlined />
        </IconButtonMod>
        
      </div>
      <div>            
        <Typography variant="subtitle1">
        Cerrar sesión
      </Typography></div>
    </div>
    ) : (
      <div >
        <IconButtonMod
          
          data-testid="user-settings-menu"
          aria-label="more"
          onClick={handleSignOut}
        >
          {/* @ts-ignore */}
          <PoweroffOutlined style={{ color: 'red' }}/>
        </IconButtonMod>        
    </div>
      )}
      </>
  );
};
