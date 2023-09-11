import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import Brightness4Icon from '@material-ui/icons/Brightness4'; // Icono para tema oscuro
import SettingsIcon from '@material-ui/icons/Settings'; // Icono para la configuración
import { Switch, ListItem, ListItemSecondaryAction, makeStyles, Typography } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { MaterialUISwitch } from './UserSettingsAppearanceSwitch';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightIcon from '@material-ui/icons/NightsStay';

const useStyles = makeStyles({
  customSwitch: {
    marginTop: '4px',
    color: 'transparent !important',
    width: '70px',
    height: '40px',
    padding: '6px',
    '& .MuiSwitch-thumb': {
      width: '28px',
      height: '28px',
      borderRadius: '50%'
    },
    '& .MuiSwitch-track': {
      height: '24px',
      borderRadius: '24px',
      color: '#FFFFFF !important'
      
    },
  },
});


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
    <a style={{ display: 'flex', flexFlow: 'row nowrap', marginLeft: '-3px',justifyContent: 'center', alignItems: 'center', height: '48px', width: '224px' }}>
      <div style={{
        marginLeft: '-20px', width: '72px',
        height: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        lineHeight: '0',
        marginRight: '-16px',
        justifyContent: 'center',

      }}>
        <span style={{
          display: 'flex',  // Cambiado a 'flex'
          alignItems: 'center',
          position: 'relative',
          flexShrink: '0',
          verticalAlign: 'middle'

        }}>
          <div >
            <ContrastIcon style={{
              fill: 'currentColor',
              width: '0.75em',
              height: '0.75em',
              display: 'inline-block',
              fontSize: '1.5rem',
              transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              flexShrink: '0',
              userSelect: 'none',

            }} />
          </div>
          <span style={{ marginLeft: '10px', fontWeight: 'bold', alignItems: 'center' }}>Tema</span>
          <div style={{ marginLeft: '25px' }}>
            {/* <ListItem > */}
              {/* <ListItemSecondaryAction> */}
                <Switch
                  checked={themeId === 'neoris-dark'}
                  onChange={handleSetTheme}
                  name="checkedTheme"
                  className={classes.customSwitch}
                  icon={<Brightness7Icon
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      position: 'absolute',
                      top: '75%',
                      left: '10%',
                      transform: 'translateY(-50%)',
                      color: 'grey'
                    }}
                  />}
                  checkedIcon={<NightIcon
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      position: 'absolute',
                      top: '75%',
                      right: '-90%',
                      transform: 'translateY(-50%)',
                      color: 'grey'
                    }}
                  />}

                />
              {/* </ListItemSecondaryAction> */}
            {/* </ListItem> */}
          </div>
        </span>
      </div>

    </a>
  );
};
