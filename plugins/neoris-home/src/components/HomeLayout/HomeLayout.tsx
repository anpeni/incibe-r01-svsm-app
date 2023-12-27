/*
 * Copyright 2022 The Backstage Authors
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

import React from 'react';
import { TabProps } from '@material-ui/core';
import {
  Header,
  Page,
  RoutedTabsMod,
} from '@internal/core-components';
import {
  attachComponentData,
  useElementFilter,
} from '@backstage/core-plugin-api';
import {
  GridView
} from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@material-ui/core';


/** @public */
export type HomeLayoutRouteProps = {
  path: string;
  title: string;
  children: JSX.Element;
  tabProps?: TabProps<React.ElementType, { component?: React.ElementType }>;
};

export const LAYOUT_DATA_KEY = 'plugin.neoris-home.homeLayout';
export const LAYOUT_ROUTE_DATA_KEY = 'plugin.neoris-home.homeLayoutRoute';

const Route: (props: HomeLayoutRouteProps) => null = () => null;
attachComponentData(Route, LAYOUT_ROUTE_DATA_KEY, true);

// This causes all mount points that are discovered within this route to use the path of the route itself
attachComponentData(Route, 'core.gatherMountPoints', true);

/** @public */
export type HomeLayoutProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

/**
 * @public
 */
export const HomeLayout = (props: HomeLayoutProps) => {
  const { title, children } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isLaptop = useMediaQuery(theme.breakpoints.down(1500));
  const routes = useElementFilter(children, elements =>
    elements
      .selectByComponentData({
        key: LAYOUT_ROUTE_DATA_KEY,
        withStrictError:
          'Child of HomeLayout must be an HomeLayout.Route',
      })
      .getElements<HomeLayoutRouteProps>()
      .map(child => child.props),
  );

  return (
    <Page themeId="home">
      
        <Header
          title={
            <span style={{ marginLeft: isMobile ? '5px': isLaptop ? '20px':'50px', display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: isMobile ? '10px':'45px' }}>
              <GridView style={{ marginRight: '20px', transform: 'scale(1.75)' }} />
              {title ?? 'Home'}
            </span>
          }
        />

      
      

      <RoutedTabsMod routes={routes} />




    </Page>
  );
};

attachComponentData(HomeLayout, LAYOUT_DATA_KEY, true);

HomeLayout.Route = Route;
