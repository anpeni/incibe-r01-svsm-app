import React from 'react';
import { identityApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import {
  SidebarItemMod,
} from '@internal/core-components';

import { PowerSettingsNewOutlined } from '@material-ui/icons';

export const UserSettingsSalir = () => {
  const errorApi = useApi(errorApiRef);
  const identityApi = useApi(identityApiRef);

  const handleSignOut = () => {
    identityApi.signOut().catch(error => errorApi.post(error));
  };

  return (
    <SidebarItemMod  
      icon={PowerSettingsNewOutlined} // Asegúrate de importar este icono
      text="Log Out" 
      onClick={handleSignOut}
      
    />
  );
};
