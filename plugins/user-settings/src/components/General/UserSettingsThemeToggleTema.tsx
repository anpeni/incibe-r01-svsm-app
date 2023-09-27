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
import { useSidebarOpenState } from '@backstage/core-components';

const useStyles = makeStyles({
  customSwitch: {
    marginTop: '4px',
    //color: 'transparent !important',
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
      //color: '#FFFFFF !important'

    },
  },
  iconLight: {
    width: '1em',
    height: '1em',
    position: 'relative',
    top: '10%',
    // top: '75%',
    // left: '10%',
    // transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.60)'

  },
  iconDark: {
    width: '1em',
    height: '1em',
    position: 'relative',
    top: '10%',
    // right: '-10%',
    // transform: 'translateY(-50%)',
    color: '#FFFFFF',

  },
  contrastIconOscuro: {
    fill: 'currentColor',
    width: '0.75em',
    height: '0.75em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: 'rgba(255, 255, 255, 0.60)'
  },
  contrastIconClaro: {
    fill: 'currentColor',
    width: '0.75em',
    height: '0.75em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: 'RGB(6, 11, 40, 0.8)'
  },
  temaOscuro: {
    marginLeft: '10px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.60)',
    alignItems: 'center',
    fontSize: '16px'
  },
  temaClaro: {
    marginLeft: '10px',
    fontWeight: 500,
    color: 'RGB(6, 11, 40)',
    alignItems: 'center',
    fontSize: '16px'
  },
  circuloicondark: {
    width: '1.25em',
    height: '1.25em',
    position: 'absolute',
    top: '75%',
    left: '80%',
    //right: '90%',
    transform: 'translateY(-50%)',
    backgroundColor: '#192A3E', // color del círculo
    borderRadius: '50%', // redondea las esquinas para hacerlo un círcul
  },
  circuloiconlight: {
    width: '1.25em',
    height: '1.25em',
    position: 'absolute',
    top: '75%',
    //left: '90%',
    right: '-25%',
    transform: 'translateY(-50%)',
    backgroundColor: '#192A3E', // color del círculo
    borderRadius: '50%', // redondea las esquinas para hacerlo un círcul
  },
});

/** @public */
export const UserSettingsThemeToggleTema = () => {
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
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              flexShrink: '0',
              verticalAlign: 'middle',
            }}>


              {isDarkMode ? (
                <>
                  <div ><ContrastIcon className={classes.contrastIconOscuro} /></div>
                  <span className={classes.temaOscuro}>Theme</span>
                </>

              ) : (
                <>
                  <div ><ContrastIcon className={classes.contrastIconClaro} /></div>
                  <span className={classes.temaClaro}>Theme</span>
                </>
              )

              }

              <div style={{ marginLeft: '25px' }}>
                {/* <div className={classes.circleBehind}> */}
                <Switch
                  checked={themeId === 'neoris-dark'}
                  onChange={handleSetTheme}
                  name="checkedTheme"
                  className={classes.customSwitch}
                  icon={
                    <div className={classes.circuloiconlight}>
                      <Brightness7Icon className={classes.iconLight} />
                    </div>
                  }

                  checkedIcon={
                    <div className={classes.circuloicondark}>
                      <NightIcon className={classes.iconDark} />
                    </div>
                  }
                />
                {/* </div> */}

              </div>
            </span>
          </div>
        </a>
      ) : (
        <div style={{ marginLeft: '2px' }}>
          <Switch
            checked={themeId === 'neoris-dark'}
            onChange={handleSetTheme}
            name="checkedTheme"
            className={classes.customSwitch}
            icon={
              <div className={classes.circuloiconlight}>
                <Brightness7Icon className={classes.iconLight} />
              </div>
            }
            checkedIcon={
              <div className={classes.circuloicondark}>
                <NightIcon className={classes.iconDark} />
              </div>
            }
          />
        </div>
      )}
    </>
  );
};

