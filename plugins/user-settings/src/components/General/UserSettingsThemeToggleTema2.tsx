import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import NightIcon from '@material-ui/icons/NightsStay';
import { Switch, ListItem, ListItemSecondaryAction, makeStyles, Typography } from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import { MaterialUISwitch } from './UserSettingsAppearanceSwitch';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useSidebarOpenState } from '@backstage/core-components';
import MySwitchTheme from './SwitchPropioTheme';
import { BackstageTheme } from '@backstage/theme';



const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    contrastIcon: {
      fill: 'currentColor',
      width: '0.75em',
      height: '0.75em',
      display: 'inline-block',
      fontSize: '1.5rem',
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      flexShrink: 0,
      userSelect: 'none',
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : 'rgba(6, 11, 40, 0.8)'
        }`,
    },
    tema: {
      marginLeft: '10px',
      fontWeight: 500,
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : '#000'
        }`,
      alignItems: 'center',
      fontSize: '16px',
    },
  }));

/** @public */
export const UserSettingsThemeToggleTema2 = () => {
  const classes = useStyles();
  const isDarkMode = localStorage.getItem('theme') === 'neoris-dark';
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  const handleSetTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    appThemeApi.setActiveThemeId(event.target.checked ? 'neoris-dark' : 'neoris-light');
  };
  const { isOpen } = useSidebarOpenState();

  return (
    <>
      {isOpen ? (
        <a style={{ display: 'flex', flexFlow: 'row nowrap', marginLeft: '3px', justifyContent: 'center', alignItems: 'center', height: '48px', width: '224px' }}>
          {/* <div style={{
            marginLeft: '-35px', 
            width: '72px',
            height: '100%',
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center',
            lineHeight: '0',
            marginRight: '-16px',
            justifyContent: 'center',
          }}> */}
              <>
                <div ><ContrastIcon className={classes.contrastIcon} /></div>
                <span className={classes.tema}>Theme</span>
              </>
              <div style={{ marginLeft: '15px' }}>
                <MySwitchTheme
                  checked={themeId === 'neoris-dark'}
                  onChange={handleSetTheme}
                  name="checkedTheme"
                >
                </MySwitchTheme>
              </div>

          {/* </div> */}
        </a>
      ) : (
        <div style={{ marginLeft: '10px', marginTop: '15px' }}>
          <MySwitchTheme
            checked={themeId === 'neoris-dark'}
            onChange={handleSetTheme}
            name="checkedTheme"
          >
          </MySwitchTheme>
        </div>
      )}
    </>
  );
};
