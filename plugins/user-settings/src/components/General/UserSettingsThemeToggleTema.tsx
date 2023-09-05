import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import Brightness4Icon from '@material-ui/icons/Brightness4'; // Icono para tema oscuro
import SettingsIcon from '@material-ui/icons/Settings'; // Icono para la configuración
import { Switch, ListItem, ListItemSecondaryAction, makeStyles, Typography } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { MaterialUISwitch } from './UserSettingsAppearanceSwitch';

const useStyles = makeStyles(theme => ({
  container: {
    //display: 'flex',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    //width: '100%',
    // paddingBottom: 8,
    // paddingRight: 16,
    paddingleft: 10
  },
  list: {
    width: 'initial',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: `0 0 12px`,
    },
  },
  listItemText: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  listItemSecondaryAction: {
    position: 'relative',
    transform: 'unset',
    top: 'auto',
    right: 'auto',
    paddingLeft: 16,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  textAndIconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px'
  },
  settingsIcon: {
    marginRight: theme.spacing(1),
  },
}));

/** @public */
export const UserSettingsThemeToggleTema = () => {
  const classes = useStyles();
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  const handleSetTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    appThemeApi.setActiveThemeId(event.target.checked ? 'neoris-dark' : 'neoris-light');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginLeft: '27px' }}>
        <SettingsIcon />
      </div>
      <div style={{ marginLeft: '2px' }}>
        <Typography variant="subtitle1">Temas</Typography>
      </div>
      <div style={{ marginLeft: '10px' }}>
        <ListItem >
          <ListItemSecondaryAction>
            {/* <MaterialUISwitch sx={{ m: 1 }} defaultChecked /> */}
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
