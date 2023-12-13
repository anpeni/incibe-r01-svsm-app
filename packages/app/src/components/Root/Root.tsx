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

import React, { PropsWithChildren, useContext, useState } from 'react';
import { Link, makeStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HeadsetMic';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { NavLink } from 'react-router-dom';
import {
  Settings as SidebarSettings,
  UserSettingsProfileNew,
  UserSettingsThemeToggleTema2,
  UserSettingsSalir,
} from '@internal/plugin-user-settings';
import CategoryIcon from '@mui/icons-material/Category';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  SidebarMod,
  sidebarConfig,
  SidebarDividerMod,
  SidebarGroup,
  SidebarItemMod,
  SidebarPage,
  SidebarSpaceMod,
  useSidebarOpenState,
  SidebarSubmenuItemMod,
  SidebarExpandButtonMod,
  Titulos,
  OtroComponenteMod,
} from '@internal/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import {
  GridView,
  SearchOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { BackstageTheme } from '@backstage/theme';
import { FluxIcon } from '@weaveworksoss/backstage-plugin-flux';

const useSidebarLogoStyles = makeStyles<BackstageTheme>(theme => ({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  search: {
    background: 'red !important',
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
  },
}));

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link
        component={NavLink}
        to="/Catalog"
        underline="none"
        className={classes.link}
        aria-label="Home"
      >
        {isOpen ? (
          <div style={{ marginLeft: 42 }}>
            <LogoFull />
          </div>
        ) : (
          <div style={{ marginLeft: 13 }}>
            <LogoIcon />
          </div>
        )}
      </Link>
    </div>
  );
};

const useStyles = makeStyles({
  sidebarContainer: {},
  sectionTitle: {
    fontSize: '8px',
    color: 'rgba(255, 255, 255, 0.30)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: '15px',
    marginTop: '15px',
    marginBottom: '10px',
  },
  sectionTitleCerrado: {
    fontSize: '8px',
    color: 'rgba(255, 255, 255, 0.30)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    lineHeight: 'normal',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
    marginBottom: '10px',
  },
  circleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#EE3131',
    marginLeft: '8px',
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
    // backdropFilter: 'blur(120px)',
  },
});

export const Root = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const [showDropDown, setShowDropDown] = useState(false);

  //console.log('Is Sidebar Open:', isOpen);

  // ? Para poner imagen de fondo a la Sidebar
  const rootStyle = {
    // backgroundImage: `url(${backgroundImageUrl})`, // Establece la imagen de fondo
    // backgroundSize: 'cover', // Otras propiedades de estilo según tu preferencia
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    // zIndex: 10,
  };

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
      <SidebarPage>
        <div className={classes.sidebarContainer}>
          <SidebarMod disableExpandOnHover>
            <SidebarLogo />
            <Titulos text={'MAIN'}></Titulos>
            <SidebarItemMod
              icon={GridView}
              to="/Catalog"
              text="Home"
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />
            <SidebarGroup label="Search" icon={<SearchOutlined />} to="/search">
              <div>
                <SidebarSearchModal />
              </div>
            </SidebarGroup>

            <SidebarGroup label="Menu" icon={<CategoryIcon />}>
              <SidebarSubmenuItemMod
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                icon={CategoryIcon}
                to="/Catalog"
                title="Catalog"
                dropdownItems={[
                  {
                    title: 'Catalog',
                    to: '/Catalog',
                  },
                  {
                    title: 'APIs',
                    to: '/api-docs',
                  },
                  {
                    title: 'Docs',
                    to: '/docs',
                  },
                ]}
              />
              <SidebarItemMod
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                icon={CreateComponentIcon}
                to="create"
                text="Create"
              />
              <SidebarItemMod
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                icon={NotificationsOutlined}
                to="notifications"
                text="Notification"
              >
                <CircleBadge count={3} />
              </SidebarItemMod>
              {/* End global nav */}
              <SidebarDividerMod className={classes.sidebarDivider} />
              <Titulos text={'ADMIN'}></Titulos>
              <SidebarSettings
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
              />
              <SidebarItemMod
                icon={HelpIcon}
                to="/ayuda"
                text="Help"
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
              />

              {/* <SidebarItem icon={FluxIcon} to="flux-runtime" text="Flux" /> */}

              <UserSettingsThemeToggleTema2 />
              {/* <OtroComponente showDropDown={showDropDown}></OtroComponente> */}
            </SidebarGroup>
            <SidebarSpaceMod />
            <SidebarExpandButtonMod />
            <SidebarDividerMod className={classes.sidebarDivider} />
            <SidebarGroup>
              <UserSettingsProfileNew />
              <UserSettingsSalir />
            </SidebarGroup>
          </SidebarMod>
        </div>
        {children}
      </SidebarPage>
    </div>
  );
};
