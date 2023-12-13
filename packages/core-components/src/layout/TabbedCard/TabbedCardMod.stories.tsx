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

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { PropsWithChildren, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CardTabMod, TabbedCardMod } from './TabbedCardMod';

const cardContentStyle = { height: 200, width: 500 };

const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <MemoryRouter>{children}</MemoryRouter>
);

export default {
  title: 'Layout/Tabbed Card',
  component: TabbedCardMod,
  decorators: [
    (storyFn: () => JSX.Element) => (
      <Grid container spacing={4}>
        <Grid item>{storyFn()}</Grid>
      </Grid>
    ),
  ],
};

export const Default = () => {
  return (
    <Wrapper>
      <TabbedCardMod title="Default Example Header">
        <CardTabMod label="Option 1">
          <div style={cardContentStyle}>Some content</div>
        </CardTabMod>
        <CardTabMod label="Option 2">
          <div style={cardContentStyle}>Some content 2</div>
        </CardTabMod>
        <CardTabMod label="Option 3">
          <div style={cardContentStyle}>Some content 3</div>
        </CardTabMod>
        <CardTabMod label="Option 4">
          <div style={cardContentStyle}>Some content 4</div>
        </CardTabMod>
      </TabbedCardMod>
    </Wrapper>
  );
};

const linkInfo = { title: 'Go to XYZ Location', link: '#' };

export const WithFooterLink = () => {
  return (
    <Wrapper>
      <TabbedCardMod title="Footer Link Example Header" deepLink={linkInfo}>
        <CardTabMod label="Option 1">
          <div style={cardContentStyle}>Some content</div>
        </CardTabMod>
        <CardTabMod label="Option 2">
          <div style={cardContentStyle}>Some content 2</div>
        </CardTabMod>
        <CardTabMod label="Option 3">
          <div style={cardContentStyle}>Some content 3</div>
        </CardTabMod>
        <CardTabMod label="Option 4">
          <div style={cardContentStyle}>Some content 4</div>
        </CardTabMod>
      </TabbedCardMod>
    </Wrapper>
  );
};

export const WithControlledTabValue = () => {
  const [selectedTab, setSelectedTab] = useState<string | number>('one');

  const handleChange = (_ev: any, newSelectedTab: string | number) =>
    setSelectedTab(newSelectedTab);

  return (
    <Wrapper>
      <Typography component="span">Selected tab is {selectedTab}</Typography>

      <TabbedCardMod
        value={selectedTab}
        onChange={handleChange}
        title="Controlled Value Example"
      >
        <CardTabMod value="one" label="Option 1">
          <div style={cardContentStyle}>Some content</div>
        </CardTabMod>
        <CardTabMod value="two" label="Option 2">
          <div style={cardContentStyle}>Some content 2</div>
        </CardTabMod>
        <CardTabMod value="three" label="Option 3">
          <div style={cardContentStyle}>Some content 3</div>
        </CardTabMod>
        <CardTabMod value="four" label="Option 4">
          <div style={cardContentStyle}>Some content 4</div>
        </CardTabMod>
      </TabbedCardMod>
    </Wrapper>
  );
};
