import { BackstageTheme } from '@backstage/theme';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import {
  SidebarConfigContext,
  SidebarItemWithSubmenuContext,
  SubmenuConfig,
} from './config';
import { useSidebarOpenState } from './SidebarOpenStateContext';
import { vars } from '../../../../app/src/themes/variables';

const useStyles = makeStyles<
  BackstageTheme,
  { submenuConfig: SubmenuConfig; left: number }
>(
  theme => ({
    root: {
      zIndex: 10,
      width: 100,
      position: 'fixed',
      top: 263,
      left: 45,
      padding: 0,
      borderRadius: '16px',
      background: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
      }`,
      boxShadow: `${
        theme.palette.type === 'dark'
          ? vars.dark.shadow.soft
          : vars.light.shadow.soft
      }`,
      overflow: 'visible',
      overflowX: 'visible',
      overflowY: 'visible',
    },
    
  }),
  { name: 'BackstageSidebarSubmenuMod' },
);

export type SidebarSubmenuPropsMod = {
  title?: string;
  children: ReactNode;
};

/**
 * Used inside SidebarItem to display an expandable Submenu
 *
 * @public
 */
export const SidebarSubmenuMod = (props: SidebarSubmenuPropsMod) => {
  const { isOpen } = useSidebarOpenState();
  const { sidebarConfig, submenuConfig } = useContext(SidebarConfigContext);
  const left = isOpen
    ? sidebarConfig.drawerWidthOpen
    : sidebarConfig.drawerWidthClosed;
  const classes = useStyles({ left, submenuConfig });

  return <Box className={classes.root}>{props.children}</Box>;
};
