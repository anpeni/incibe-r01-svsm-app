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
import { Link, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import MapIcon from '@material-ui/icons/MyLocation';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import CategoryIcon from '@material-ui/icons/Category';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { NavLink } from 'react-router-dom';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
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
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ViewModuleIcon from '@material-ui/icons/ViewModule'

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
    borderRadius: '12px',
    overflow: 'hidden', // Para que el contenido no se desborde
  },
});

export const Root = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles();

  const rootStyle = {
    backgroundImage: `url(${backgroundImageUrl})`, // Establece la imagen de fondo
    backgroundSize: 'cover', // Otras propiedades de estilo según tu preferencia
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className={classes.sidebarContainer} style={rootStyle}>
      <SidebarPage>
        <Sidebar disableExpandOnHover>
          <SidebarLogo />
          <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
            <SidebarSearchModal />
          </SidebarGroup>
          <SidebarDivider />
          <SidebarGroup label="Menu" icon={<MenuIcon />}>
            {/* Global nav, not org-specific */}
            <SidebarSubmenuItem icon={ViewModuleIcon} to="/" title="Control Panel" 
            dropdownItems={[
              {
                title: 'Actividad',
                to: '/7',
              },
              {
                title: 'Tráfico',
                to: '/8',
              },
            ]}
            
            />
            <SidebarItem icon={HomeIcon} to="/" text="Home" />
            <SidebarItem icon={CategoryIcon} to="catalog" text="Catalog" />
            <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
            <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
            <SidebarItem
              icon={CreateComponentIcon}
              to="create"
              text="Create..."
            />
            {/* End global nav */}
            <SidebarDivider />
            <SidebarScrollWrapper>
              <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
            </SidebarScrollWrapper>
          </SidebarGroup>
          <SidebarSpace />
          <SidebarExpandButton />
          <SidebarDivider />
          <SidebarGroup
            label="Settings"
            icon={<UserSettingsSignInAvatar />}
            to="/settings"
          >
            <SidebarSettings />
          </SidebarGroup>
        </Sidebar>
        {children}
      </SidebarPage>
    </div>
  );
};