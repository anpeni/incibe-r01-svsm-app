
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

const useStyles = makeStyles<
  BackstageTheme,
  { submenuConfig: SubmenuConfig; left: number }
>(
  theme => ({
    root: {
      zIndex: 10,
      width: 120,
      position: 'fixed',
      top: 165,
      left: 45,      
      padding: 0,
      //background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      borderRadius: '16px',
      backdropFilter: 'blur(120px)',
      background: bgColor,
      // position: 'relative',
      overflow: 'visible',
      overflowX: 'visible',
      overflowY: 'visible',
      // width: theme.spacing(7) + 1,
    },
    drawer: props => ({
      //zIndex: 1000,
      //overflow: 'scroll',
      //display: 'flex',
      //flexDirection: 'row',
      //flexFlow: 'column nowrap',
      //alignItems: 'flex-start',
      //position: 'fixed',
      //left: 45,
      //backdropFilter: 'blur(120px)',
      // [theme.breakpoints.up('sm')]: {
      //   //marginLeft: props.left,
      //   transition: theme.transitions.create('margin-left', {
      //     easing: theme.transitions.easing.sharp,
      //     duration: theme.transitions.duration.shortest,
      //   }),
      // },
      //top: 165,
      //bottom: 0,
      //padding: 0,
      //background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      //overflowX: 'visible',
      //msOverflowStyle: 'none',
      //scrollbarWidth: 'none',
      //cursor: 'default',
      //width: props.submenuConfig.drawerWidthClosed,
      // transitionDelay: `${props.submenuConfig.defaultOpenDelayMs}ms`,
      // '& > *': {
      //   flexShrink: 0,
      // },
      // '&::-webkit-scrollbar': {
      //   display: 'none',
      // },
    }),
    drawerOpen: props => ({
      width: props.submenuConfig.drawerWidthOpen,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        position: 'relative',
        paddingLeft: theme.spacing(3),
        left: 0,
        top: 0,
      },
    }),
    title: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightMedium as any,
      color: theme.palette.common.white,
      padding: theme.spacing(2.5),
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }),
  { name: 'BackstageSidebarSubmenu' },
);

const bgColor =
  'linear-gradient(90deg, rgba(6,11,40,0.75) 50%, rgba(6,11,40,0.7) 100%)';

export type SidebarSubmenuProps = {
  title?: string;
  children: ReactNode;
};

/**
 * Used inside SidebarItem to display an expandable Submenu
 *
 * @public
 */
export const SidebarSubmenu = (props: SidebarSubmenuProps) => {
  const { isOpen } = useSidebarOpenState();
  const { sidebarConfig, submenuConfig } = useContext(SidebarConfigContext);
  const left = isOpen
    ? sidebarConfig.drawerWidthOpen
    : sidebarConfig.drawerWidthClosed;
  const classes = useStyles({ left, submenuConfig });


  // const { isHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  // const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);

  // useEffect(() => {
  //   setIsSubmenuOpen(isHoveredOn);
  // }, [isHoveredOn]);

  // const handleSubmenuClick = () => {
  //   console.log("Submenu clicked!");
  //   setIsSubmenuOpen(!isSubmenuOpen);
  // };


  return (
    
    <Box
      className={classnames(classes.root
      )}
    //onClick={handleSubmenuClick}
    >

      {props.children}

    </Box>
    
  );
};
