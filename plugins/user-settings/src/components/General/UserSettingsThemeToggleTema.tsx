import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import Brightness4Icon from '@material-ui/icons/Brightness4'; // Icono para tema oscuro
import SettingsIcon from '@material-ui/icons/Settings'; // Icono para la configuración
import { Switch, ListItem, ListItemSecondaryAction, makeStyles, Typography } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { MaterialUISwitch } from './UserSettingsAppearanceSwitch';
import ContrastIcon from '@mui/icons-material/Contrast';

const useStyles = makeStyles(theme => ({
  home: {
    borderLeft: 'solid 3px #2684FF'
  },
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
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderLeft: 'solid 3px #2684FF', height: '48px'}}>
      {/* <div style={{ marginLeft: '27px' }}> */}
      <div style={{ fontSize: '2rem' }}>
        <ContrastIcon />
      </div>
      <div style={{ marginLeft: '2px', fontWeight: 'bold'}}>
        <span >Temas</span>
      </div>
      {/* <div style={{ marginLeft: '10px'}}>
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
      </div> */}
    </div>
  );
};
