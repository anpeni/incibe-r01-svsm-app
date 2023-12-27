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
import { HomeGeneral } from '../General';
import { HomeLayout, HomeLayoutRouteProps } from '../HomeLayout';


/**
 * @public
 */
export const DefaultHomePage = (props: {
  
  tabs?: React.ReactElement<HomeLayoutRouteProps>[];
  providerHome?: JSX.Element;
}) => {
  const { tabs } = props;
 

  return (
    <HomeLayout>
      <HomeLayout.Route path="general" 
      title ="Cluster Status"

      >
        
        <HomeGeneral />
      </HomeLayout.Route>
      
      <HomeLayout.Route
        path="general"
        title="Datastore Status"
      >
        <HomeGeneral />
      </HomeLayout.Route>
      <HomeLayout.Route path="general" title="Hypervisor Status">
      <HomeGeneral />
      </HomeLayout.Route>
      {tabs}
    </HomeLayout>
  );
};
