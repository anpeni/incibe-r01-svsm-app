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
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TabUI, { TabProps } from '@material-ui/core/Tab';
import Tabs from '@internal/material-ui-core/Tabs';
import React, { useCallback, useEffect, useState } from 'react';

// TODO(blam): Remove this implementation when the Tabs are ready
// This is just a temporary solution to implementing tabs for now

/** @public */
export type HeaderTabsClassKey =
  | 'tabsWrapperr'
  | 'defaultTabb'
  | 'selectedd'
  | 'tabRoott';

// const bgColor =
// 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.50) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))';

export type Tab = {
  id: string;
  label: string;
  tabProps?: TabProps<React.ElementType, { component?: React.ElementType }>;
};

type HeaderTabsProps = {
  tabs: Tab[];
  onChange?: (index: number) => void;
  selectedIndex?: number;
};

/**
 * Horizontal Tabs component
 *
 * @public
 *
 */
export function HeaderTabsMod(props: HeaderTabsProps) {
  const { tabs, onChange, selectedIndex } = props;
  const [selectedTab, setSelectedTab] = useState<number>(selectedIndex ?? 0);
  const useStyles = makeStyles(
    theme => {
      return {
        tabsWrapperr: {
          gridArea: 'pageSubheader',
          //backgroundColor: 'red',
          paddingLeft: theme.spacing(8),
          minWidth: 0,
          [theme.breakpoints.down(1500)]: {
            paddingLeft: theme.spacing(3),
          },
          [theme.breakpoints.down(800)]: {
            paddingLeft: theme.spacing(1),
          },

        },
        defaultTabb: {
          //...theme.typography.caption,
          //paddingLeft: theme.spacing(3, 3),
          textTransform: 'none',
          fontWeight: 400,
          fontfamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          color: `${theme.palette.type === 'dark' ? '#fff' : '#000'}`,
          fontSize: '16px',
          [theme.breakpoints.down('xs')]: {
            fontSize: '12px',
          },
        },
        selectedd: {
          color: `${theme.palette.type === 'dark' ? '#fff' : '#000'}`,
          fontWeight: 700,
          borderRadius: '12px',
        },
        tabRoott: {
          '&:hover': {
            // TODO Cambiar colores hover si se indica despues
            borderRadius: '12px',
            background: 'none',
            color: '#4FD1C5',
          },
        },
      };
    },
    { name: 'BackstageHeaderTabsSettings' },
  );

  const styles = useStyles();

  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, index: number) => {
      if (selectedIndex === undefined) {
        setSelectedTab(index);
      }
      if (onChange && selectedIndex !== index) onChange(index);
    },
    [selectedIndex, onChange],
  );

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setSelectedTab(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <Box className={styles.tabsWrapperr}>
      <Tabs
        selectionFollowsFocus
        indicatorColor="primary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="tabs"
        onChange={handleChange}
        value={selectedTab}
      >
        {tabs.map((tab, index) => (
          <TabUI
            {...tab.tabProps}
            data-testid={`header-tab-${index}`}
            label={tab.label}
            key={tab.id}
            value={index}
            className={styles.defaultTabb}
            classes={{ selected: styles.selectedd, root: styles.tabRoott }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
