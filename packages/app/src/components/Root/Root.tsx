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

import React, { PropsWithChildren } from 'react';
import { Link, Typography, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import MapIcon from '@material-ui/icons/MyLocation';
import HelpIcon from '@material-ui/icons/HeadsetMic';
import NightIcon from '@material-ui/icons/NightsStay';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import CategoryIcon from '@material-ui/icons/Category';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { NavLink } from 'react-router-dom';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar, UserSettingsProfileNew,
  UserSettingsThemeToggleTema, UserSettingsTema, UserSettingsSalir
} from '@backstage/plugin-user-settings';


import { SearchModal, SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  SidebarSubmenuItem,
  SidebarExpandButton,
  SidebarSubmenu,
  Titulos,
  SidebarSubmenuItemModificado
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { GridView, SettingsOutlined, SearchOutlined, NotificationsOutlined } from '@mui/icons-material'
import { DescriptionOutlined } from '@material-ui/icons';
import { useApp } from '@backstage/core-plugin-api';


const backgroundImageUrl = require('../../assets/Incibe-Background.png');

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link
        component={NavLink}
        to="/"
        underline="none"
        className={classes.link}
        aria-label="Home"
      >
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

const useStyles = makeStyles({
  sidebarContainer: {
    //zIndex: 10,
    overflow: 'visible',
    //backgroundColor: 'white',// Para que el contenido no se desborde
    //backdropFilter: 'blur(120px)'
  },
  sectionTitle: {
    fontSize: '8px',
    color: 'rgba(255, 255, 255, 0.30)',
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: '15px',
    marginTop: '15px',
    marginBottom: '10px'
  },
  sectionTitleCerrado: {
    fontSize: '8px',
    color: 'rgba(255, 255, 255, 0.30)',
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: 'auto',  // Centrado horizontal (requiere un contenedor flex)
    marginRight: 'auto',
    marginTop: '15px',
    marginBottom: '10px'
  },
  titulos: {

  },
  circleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#EE3131',
    marginLeft: '8px', // Espacio entre el texto y el círculo
  },
  number: {
    color: 'white',
    fontSize: '12px',
  },
  sidebarDivider: {
    background: '#FFFFFF',
    opacity: 0.3,
  },
  sideBarStyle: {
    backdropFilter: 'blur(120px)'

  }
});

export const Root = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  //console.log('Is Sidebar Open:', isOpen);
  const rootStyle = {
    backgroundImage: `url(${backgroundImageUrl})`, // Establece la imagen de fondo
    backgroundSize: 'cover', // Otras propiedades de estilo según tu preferencia
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 10,
  };

  const sideBarStyle = {
    backdropFilter: 'blur(120px)'

  }

  const CircleBadge = ({ count }: { count: number }) => {
    const classes = useStyles();

    return (
      <div className={classes.circleBadge}>
        {count > 0 && <div className={classes.number}>{count}</div>}
      </div>
    );
  };


  return (
    <div className={classes.sidebarContainer} style={rootStyle}>
      <SidebarPage >
        <div className={classes.sidebarContainer}>
          <Sidebar disableExpandOnHover>
            <SidebarLogo />
            <SidebarGroup label="Search" icon={<SearchOutlined />} to="/search">
            </SidebarGroup>
            <Titulos text={'PRINCIPAL'} ></Titulos>
            <SidebarGroup label="Menu" icon={<MenuIcon />}>
              <SidebarSubmenuItem icon={GridView} to="/" title="Control Panel"
                dropdownItems={[
                  {
                    title: 'Actividad',
                    to: '/Catalog',
                  },
                  {
                    title: 'Tráfico',
                    to: '/8',
                  },
                  {
                    title: 'Prueba1',
                    to: '/8',
                  },
                  {
                    title: 'Prueba2',
                    to: '/8',
                  },
                ]}

              />
              <SidebarItem icon={HomeIcon} to="/" text="Home" />
              <SidebarItem icon={CategoryIcon} to="catalog" text="Catalog" />
              <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
              <SidebarItem icon={DescriptionOutlined} to="docs" text="Docs" />
              <SidebarItem
                icon={CreateComponentIcon}
                to="create"
                text="Create..."
              />
              <SidebarItem
                icon={NotificationsOutlined}
                to="notifications"
                text="Notifications"
              >
                <CircleBadge count={3} /> {/* Cambia el número según tus necesidades */}
              </SidebarItem>
              {/* End global nav */}
              <SidebarDivider className={classes.sidebarDivider} />

              <Titulos text={'ADMINISTRADOR'} ></Titulos>

              <SidebarScrollWrapper>
                <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
                <SidebarItem icon={HelpIcon} to="/ayuda" text="Ayuda" />
                <SidebarItem
                  icon={NightIcon}
                  to="/tema"
                  text="Tema" />

              </SidebarScrollWrapper>
            </SidebarGroup>
            <SidebarSpace />
            <SidebarExpandButton />
            <SidebarDivider className={classes.sidebarDivider} />
            <SidebarGroup
              label="Settings"
              icon={<SettingsOutlined />}
              to="/settings"
            >
              <SidebarSettings />
              <UserSettingsThemeToggleTema />
              {/* <UserSettingsTema /> */}
            </SidebarGroup>
            <SidebarDivider className={classes.sidebarDivider} />
            <SidebarGroup>
              <UserSettingsProfileNew />
              <UserSettingsSalir />
            </SidebarGroup>
          </Sidebar>
        </div>
        {children}
      </SidebarPage>
    </div>
  );
};