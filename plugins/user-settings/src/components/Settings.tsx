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

import React from 'react';
import { settingsRouteRef } from '../plugin';
import { SidebarItemMod } from '@internal/core-components';
import { useRouteRef, IconComponent } from '@backstage/core-plugin-api';
import { SettingsOutlined } from '@material-ui/icons';

/** @public */
export const Settings = (props: { 
  icon?: IconComponent, 
  showDropDown?: boolean, 
  setShowDropDown?: (show: boolean) => void 

}) => {
  const routePath = useRouteRef(settingsRouteRef);
  const Icon = props.icon ? props.icon : SettingsOutlined;
  return <SidebarItemMod text="Settings" to={routePath()} icon={Icon} showDropDown={props.showDropDown}
  setShowDropDown={props.setShowDropDown}/>;
};
