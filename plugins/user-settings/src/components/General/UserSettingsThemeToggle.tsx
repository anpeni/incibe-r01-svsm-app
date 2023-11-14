/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { cloneElement } from 'react';
import useObservable from 'react-use/lib/useObservable';
import AutoIcon from '@material-ui/icons/BrightnessAuto';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { appThemeApiRef, useApi } from '@backstage/core-plugin-api';
import NightIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import { vars } from '../../../../../packages/app/src/themes/variables';

type ThemeIconProps = {
  id: string;
  activeId: string | undefined;
  icon: JSX.Element | undefined;
};

const ThemeIcon = ({ id, activeId, icon }: ThemeIconProps) =>
  icon ? (
    cloneElement(icon, {
      color: activeId === id ? 'primary !important' : 'secondary !important',
    })
  ) : (
    <AutoIcon color={activeId === id ? 'primary' : undefined} />
  );

type TooltipToggleButtonProps = {
  children: JSX.Element;
  title: string;
  value: string;
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingRight: 16,
  },
  titulo: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'}`,
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    position: 'relative',
    //top: '-5px',
  },
  texto: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'}`,
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    position: 'relative',
    top: '-20px',
  },
  textoDarkToggle: {
    color: '#333',
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px !important',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    position: 'relative',
    textTransform: 'none',
    //top: '-20px',
    marginRight: '10px',
  },
  textoDarkToggleSelected: {
    color: 'white',
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px !important',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    position: 'relative',
    textTransform: 'none',
    marginRight: '10px',
    //top: '-20px',
    //transform: 'scale(1/1.8)',
  },
  textoTema: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'}`,
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  },
  lista: {
    position: 'relative',
    //top: '3px',
    left: '12px',
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
  toggleGroup: {
    display: 'flex',
    justifyContent: 'center' /* Alineación horizontal */,
    alignItems: 'center',
  },
  toggleGroupSelected: {
    display: 'flex',
    justifyContent: 'center' /* Alineación horizontal */,
    alignItems: 'center',
  },
  sombreado: {
    position: 'relative',
    // ...tus otros estilos
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-12px',
      left: '-12px',
      right: '-12px',
      bottom: '-12px',
      background: vars.dark.background.accent,
      borderRadius: '24px',
      zIndex: 0,
    },
  },
  listItemSecondaryAction: {
    // Botones
    background: 'white',
    borderRadius: '24px',
    position: 'relative',
    transform: 'unset',
    top: 'auto',
    right: 'auto',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  toggleGroupNuevo: {
    right: '60px',
    top: '95px',
    background: 'white',
    width: '400px',
    height: '35px',
    borderRadius: '24px',
    display: 'flex', // Añadimos flex para hacer el contenedor flexible
    justifyContent: 'space-between',
    position: 'fixed',
    // Añadimos esto para distribuir el espacio
  },
  toggleIndependienteDark: {
    position: 'relative', // necesario para el posicionamiento del pseudo-elemento
    flexDirection: 'row',
    flexGrow: 1,
    border: 'none !important',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-7px', // ajusta según lo grande que quieras que sea el área
      bottom: '-7px',
      left: '-7px',
      right: '-7px',
      zIndex: 0, // para que aparezca detrás del botón
      color: 'white',
    },
  },
  activoDark: {
    '&::before': {
      background: vars.dark.background.accent,
      borderRadius: '30px',
    },
  },
  activoLight: {
    '&::before': {
      background: vars.dark.background.accent,
      borderRadius: '30px',
    },
  },
  iconoDarkToggle: {
    color: '#333',
    position: 'relative',
    zIndex: 0,
  },
  iconoDarkToggleSelected: {
    color: 'white',
    position: 'relative',
    zIndex: 0,
  },
  iconoLightToggleSelected: {
    color: 'white',
    position: 'relative',
    zIndex: 0,
  },
}));

// ToggleButtonGroup uses React.children.map instead of context
// so wrapping with Tooltip breaks ToggleButton functionality.
const TooltipToggleButton = ({
  children,
  title,
  value,
  ...props
}: TooltipToggleButtonProps) => (
  <Tooltip placement="top" arrow title={title}>
    <ToggleButton value={value} {...props}>
      {children}
    </ToggleButton>
  </Tooltip>
);

/** @public */
export const UserSettingsThemeToggle = () => {
  const classes = useStyles();
  const isDarkMode = localStorage.getItem('theme') === 'neoris-dark';
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );

  const themeIds = appThemeApi.getInstalledThemes();

  const handleSetTheme = (
    _event: React.MouseEvent<HTMLElement>,
    newThemeId: string | undefined,
  ) => {
    if (themeIds.some(t => t.id === newThemeId)) {
      appThemeApi.setActiveThemeId(newThemeId);
    } else {
      appThemeApi.setActiveThemeId(undefined);
    }
  };

  return (
    <ListItem
      className={classes.list}
      classes={{ container: classes.container }}
    >
      <div className={classes.lista}>
        <span className={classes.titulo}>Theme</span>
        <p className={classes.texto}>Change the theme mode</p>
      </div>

      <ToggleButtonGroup
        exclusive
        size="large"
        value={themeId ?? 'auto'}
        onChange={handleSetTheme}
        className={classes.toggleGroupNuevo}
      >
        <ToggleButton
          value="neoris-dark"
          selected={themeId === 'neoris-dark'}
          className={`${
            isDarkMode
              ? classes.toggleIndependienteDark
              : classes.toggleIndependienteDark
          } ${
            themeId === 'neoris-dark' && isDarkMode ? classes.activoDark : ''
          }`}
        >
          <span
            className={
              themeId === 'neoris-dark'
                ? classes.textoDarkToggleSelected
                : classes.textoDarkToggle
            }
          >
            Dark mode
          </span>
          <NightIcon
            className={
              themeId === 'neoris-dark'
                ? classes.iconoDarkToggleSelected
                : classes.iconoDarkToggle
            }
          />
        </ToggleButton>

        <ToggleButton
          value="neoris-light"
          selected={themeId === 'neoris-light'}
          className={`${
            isDarkMode
              ? classes.toggleIndependienteDark
              : classes.toggleIndependienteDark
          } ${themeId === 'neoris-light' ? classes.activoLight : ''}`}
        >
          <span
            className={
              themeId === 'neoris-light'
                ? classes.textoDarkToggleSelected
                : classes.textoDarkToggle
            }
          >
            Light mode
          </span>
          <Brightness7Icon
            className={
              themeId === 'neoris-light'
                ? classes.iconoDarkToggleSelected
                : classes.iconoDarkToggle
            }
          />
        </ToggleButton>

        <ToggleButton
          value="auto"
          selected={themeId === undefined}
          className={`${
            isDarkMode
              ? classes.toggleIndependienteDark
              : classes.toggleIndependienteDark
          } ${themeId === undefined && !isDarkMode ? classes.activoDark : ''}`}
        >
          <span
            className={
              themeId === undefined
                ? classes.textoDarkToggleSelected
                : classes.textoDarkToggle
            }
          >
            Auto
          </span>
          <AutoIcon
            className={
              themeId === undefined
                ? classes.iconoDarkToggleSelected
                : classes.iconoDarkToggle
            }
          />
        </ToggleButton>
      </ToggleButtonGroup>
      {/* </ListItemSecondaryAction> */}
    </ListItem>
  );
};
