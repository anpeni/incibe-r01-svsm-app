import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import Brightness4Icon from '@material-ui/icons/Brightness4'; // Icono para tema oscuro
import SettingsIcon from '@material-ui/icons/Settings'; // Icono para la configuración
import { Switch, ListItem, ListItemSecondaryAction, makeStyles, Typography } from '@material-ui/core';
import { IconComponent, appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { MaterialUISwitch } from './UserSettingsAppearanceSwitch';
import {
  SidebarItem,
} from '@backstage/core-components';
import ContrastIcon from '@mui/icons-material/Contrast';


/** @public */

const MiIcono: IconComponent = ContrastIcon as unknown as IconComponent;
export const UserSettingsTema = () => {
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  const handleSetTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    appThemeApi.setActiveThemeId(event.target.checked ? 'neoris-dark' : 'neoris-light');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ maxWidth: '80%'}}>
      <SidebarItem 
        icon={MiIcono}
        to="/" // Asegúrate de importar este icono
        text="Temas"
      />
      </div>

      <div style={{ marginLeft: '10px' }}>
        <ListItem >
          <ListItemSecondaryAction>
            <Switch
              checked={themeId === 'neoris-dark'}
              onChange={handleSetTheme}
              name="checkedTheme"
              icon={<Brightness7Icon />}
              checkedIcon={<Brightness4Icon />}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    </div>

  );
};
