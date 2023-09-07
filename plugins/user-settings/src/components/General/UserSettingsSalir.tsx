import React from 'react';
import { IconButton } from '@material-ui/core';
import { identityApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import {
  SidebarItem,
} from '@backstage/core-components';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

export const UserSettingsSalir = () => {
  const errorApi = useApi(errorApiRef);
  const identityApi = useApi(identityApiRef);

  const handleSignOut = () => {
    identityApi.signOut().catch(error => errorApi.post(error));
  };

  return (
    <SidebarItem       
      icon={PowerSettingsNew} // Asegúrate de importar este icono
      text="Cerrar sesión" 
      onClick={handleSignOut}
    />
  );
};
