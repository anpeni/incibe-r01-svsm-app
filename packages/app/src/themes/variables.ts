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

/**
 * Built-in Backstage color palettes.
 *
 * @public
 */
export const vars = {
  fontFamily: 'Inter, sans-serif',
  light: {
    type: 'light' as const,
    mode: 'light' as const,

    shadow: {
      soft: '0 4px 20px 0 rgba(0, 0, 0, 0.7)',
      sidebar: '0 4px 13px 0 rgba(0, 0, 0, 0.75)',
    },
    fontColor: {
      white: '#FFF',
      black: '#000',
    },
    background: {
      generic: '#FFF',
      card: '#EFEFEF',
      accent: '#4FD1C5', // ? Turquesa de acento
      highlight: '#101112', // ? Color oscurillo (negro)
      white: '#FFF',
    },
    table: {
      headerBackground: '#101112',
      evenRows: '#E5E2E2',
    },
  },
  dark: {
    type: 'dark' as const,
    mode: 'dark' as const,

    shadow: {
      soft: '0px 0px 1px 0px rgba(255, 255, 255, 0.5)',
    },
    fontColor: {
      white: '#FFF',
      black: '#000',
    },
    background: {
      generic: '#18191D',
      card: '#222429',
      accent: '#4FD1C5', // ? Turquesa de acento
      highlight: '#101112', // ? Color oscurillo (negro)
      white: '#FFF',
    },
    table: {
      headerBackground: '#101112',
      evenRows: '#17191C',
    },
  },
};
