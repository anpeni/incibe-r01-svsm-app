import React from 'react';
import { IconButton } from '@material-ui/core';
import { identityApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import {
  SidebarItem,
} from '@backstage/core-components';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { PowerSettingsNewOutlined } from '@material-ui/icons';

export const UserSettingsSalir = () => {
  const errorApi = useApi(errorApiRef);
  const identityApi = useApi(identityApiRef);

  const handleSignOut = () => {
    identityApi.signOut().catch(error => errorApi.post(error));
  };

  return (
    <SidebarItem       
      icon={PowerSettingsNewOutlined} // Asegúrate de importar este icono
      text="Log Out" 
      onClick={handleSignOut}
    />
  );
};
