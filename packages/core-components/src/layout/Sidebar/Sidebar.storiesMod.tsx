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
import { createRouteRef } from '@backstage/core-plugin-api';
import { wrapInTestApp } from '@backstage/test-utils';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AppsIcon from '@material-ui/icons/Apps';
import React, { ComponentType, PropsWithChildren , useState } from 'react';
import { SidebarPage } from './Page';
import { SidebarMod } from './BarMod';
import { SidebarGroup } from './SidebarGroup';
import {
  SidebarDividerMod,
  SidebarExpandButtonMod,
  SidebarItemMod,
  SidebarSearchFieldMod,
  SidebarSpaceMod,
} from './ItemsMod';
import { SidebarIntro } from './Intro';
import { SidebarSubmenuMod } from './SidebarSubmenuMod';
import { SidebarSubmenuItemMod } from './SidebarSubmenuItemMod';

const routeRef = createRouteRef({
  id: 'storybook.test-route',
});

export default {
  title: 'Layout/Sidebar',
  component: SidebarMod,
  decorators: [
    (Story: ComponentType<PropsWithChildren<{}>>) =>
      wrapInTestApp(<Story />, { mountedRoutes: { '/': routeRef } }),
  ],
};

const handleSearch = (input: string) => {
  // eslint-disable-next-line no-console
  console.log(input);
};

export const SampleSidebarMod = () => (
  
  <SidebarPage>
    <SidebarMod>
      <SidebarGroup label="Menu" icon={MenuIcon}>
        <SidebarSearchFieldMod onSearch={handleSearch} to="/search" />
        <SidebarDividerMod />
        <SidebarItemMod icon={HomeOutlinedIcon} to="#" text="Plugins" />
        <SidebarItemMod icon={AddCircleOutlineIcon} to="#" text="Create..." />
        <SidebarDividerMod />
        <SidebarIntro />
        <SidebarSpaceMod />
      </SidebarGroup>
    </SidebarMod>
  </SidebarPage>
);
const [showDropDown, setShowDropDown] = useState(false);
export const SampleScalableSidebar = () => (
  
  <SidebarPage>
    <SidebarMod disableExpandOnHover>
      <SidebarSearchFieldMod onSearch={handleSearch} to="/search" />
      <SidebarDividerMod />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        <SidebarItemMod icon={MenuBookIcon} text="Catalog">
          <SidebarSubmenuMod title="Catalog">
            <SidebarSubmenuItemMod title="Tools" to="/1" icon={BuildRoundedIcon}               showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}/>
            <SidebarSubmenuItemMod title="APIs" to="/2" icon={CloudQueueIcon}               showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}/>
            <SidebarSubmenuItemMod title="Components" to="/3" icon={AppsIcon}               showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}/>
            <SidebarSubmenuItemMod
              title="Misc"
              to="/6"
              icon={AcUnitIcon}
              dropdownItems={[
                {
                  title: 'Lorem Ipsum',
                  to: '/7',
                },
                {
                  title: 'Lorem Ipsum',
                  to: '/8',
                },
              ]}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />
          </SidebarSubmenuMod>
        </SidebarItemMod>
        <SidebarItemMod icon={HomeOutlinedIcon} to="#" text="Plugins" />
        <SidebarItemMod icon={AddCircleOutlineIcon} to="#" text="Create..." />
      </SidebarGroup>
      <SidebarDividerMod />
      <SidebarIntro />
      <SidebarSpaceMod />
      <SidebarExpandButtonMod />
    </SidebarMod>
  </SidebarPage>
);
