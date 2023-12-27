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

import {
  createPlugin,
  createRoutableExtension,
  createRouteRef,
} from '@backstage/core-plugin-api';

export const homeRouteRef = createRouteRef({
  id: 'neoris-home',
});

/** @public */
export const neorisHomePlugin = createPlugin({
  id: 'neoris-home',
  routes: {
    homePage: homeRouteRef,
  },
});

/** @public */
export const NeorisHomePage = neorisHomePlugin.provide(
  createRoutableExtension({
    name: 'NeorisHomePage',
    component: () =>
      import('./components/HomePage').then(m => m.HomePage),
    mountPoint: homeRouteRef,
  }),
);
