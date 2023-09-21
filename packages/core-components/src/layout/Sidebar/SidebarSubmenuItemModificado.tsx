import React, { useContext, useState } from 'react';
import { resolvePath, useLocation, useResolvedPath } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../components/Link';
import { IconComponent } from '@backstage/core-plugin-api';
import classnames from 'classnames';
import { BackstageTheme } from '@backstage/theme';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { SidebarItemWithSubmenuContext } from './config';
import { isLocationMatch } from './utils';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

const useStyles = makeStyles<BackstageTheme>(
  () => ({
    item: {
      // height: 48,
      // width: '100%',
      // '&:hover': {
      //   background:
      //     theme.palette.navigation.navItem?.hoverBackground || '#6f6f6f',
      //   color: theme.palette.navigation.selectedColor,
      // },
      // display: 'flex',
      // alignItems: 'center',
      // color: theme.palette.navigation.color,
      // padding: theme.spacing(2.5),
      // cursor: 'pointer',
      // position: 'relative',
      // background: 'none',
      // border: 'none',
    },
    itemContainer: {
      // width: '100%',
    },
    selected: {
      // background: '#6f6f6f',
      // color: theme.palette.common.white,
    },
    label: {
      // margin: theme.spacing(1.75),
      // marginLeft: theme.spacing(1),
      // fontSize: theme.typography.body2.fontSize,
      // whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // 'text-overflow': 'ellipsis',
      // lineHeight: 1,
    },
    subtitle: {
      // fontSize: 10,
      // whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // 'text-overflow': 'ellipsis',
    },
    // dropdownArrow: {
    //   position: 'absolute',
    //   right: 21,
    // },
    dropdown: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      //alignItems: 'start',

    },
    dropdownItem: {
      //width: '50%',
      padding: '10px 0 10px 0',
      //'&:hover': {
      //background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      //color: 'theme.palette.navigation.selectedColor',
      //borderradius: '12px',
      // },
      '&:hover': {
        background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
        //color: 'theme.palette.navigation.selectedColor',
        borderRadius: '12px',
        //width: '80px',
        //height: '10px',
      },
      //padding: '10px',
      //margin: '10px',
    },
    dropdownItemSeleccionado: {
      padding: '10px 0 10px 0',
      '&:hover': {
        background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
        borderRadius: '12px',
      },
      background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      borderRadius: '12px',
    },
    textContent: {
      color: 'rgba(255, 255, 255, 0.60)',
      fontFamily: 'Inter, sans-serif',
      paddingLeft: 20,
      //paddingRight: theme.spacing(4),
      fontSize: '13px',
      // whiteSpace: 'nowrap',
      // overflow: 'hidden',
      // 'text-overflow': 'ellipsis',
    },
    elementoSeleccionado: {
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      paddingLeft: 20,
      fontSize: '13px',
    }
  }),
  { name: 'BackstageSidebarSubmenuItem' },
);


export type SidebarSubmenuItemDropdownItem = {
  title: string;
  to: string;
};

export type SidebarSubmenuItemProps = {
  title?: string;
  subtitle?: string;
  to?: string;
  icon?: IconComponent | OverridableComponent<SvgIconTypeMap>;
  dropdownItems?: SidebarSubmenuItemDropdownItem[];
  exact?: boolean;
  selectedFromParent?: any;
  onSelectedObjectChange?: (newSelectedObject: any) => void;
};


export const SidebarSubmenuItemModificado = (props: SidebarSubmenuItemProps) => {
  const { title, subtitle, to, icon: Icon, dropdownItems, exact, selectedFromParent } = props;
  const classes = useStyles();
  //const [isSelected, setIsSelected] = useState(false);
  const [selectedObject, setSelectedObject] = useState(selectedFromParent);
  const { setIsHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  const closeSubmenu = () => {
    setIsHoveredOn(false);
  };
  const toLocation = useResolvedPath(to ?? '');
  const currentLocation = useLocation();
  let isActive = isLocationMatch(currentLocation, toLocation, exact);

  const [showDropDown, setShowDropDown] = useState(true);
  // const handleClickDropdown = () => {
  //   setIsSelected(!isSelected);
  // };

  // const handleClickSeleccionado = () => {
  //   setShowDropDown(!showDropDown);
  // };

  const handleObjectClick = (object: any) => {
    setSelectedObject(object.title); // Aquí asumo que cada objeto tiene un título único. Puedes usar cualquier propiedad única.
    if (props.onSelectedObjectChange) {
      props.onSelectedObjectChange(object);
      //console.log("object.title: ", object.title);
    }
  };


  if (dropdownItems !== undefined) {
    dropdownItems.some(item => {
      const resolvedPath = resolvePath(item.to);
      isActive = isLocationMatch(currentLocation, resolvedPath, exact);
      return isActive;
    });
    return (
      <Box >
        {dropdownItems && showDropDown && (
          <Box className={classes.dropdown}
          >
            {dropdownItems.map((object, key) => (
              <Link
                to={object.to}
                underline="none"
                className={
                  selectedObject === object.title // Comprobar si el objeto está seleccionado
                    ? classes.dropdownItemSeleccionado
                    : classes.dropdownItem
                }
                onClick={() => handleObjectClick(object)}
                onTouchStart={e => e.stopPropagation()}
              >
                <div >
                  <Typography
                    component="span"
                    className={
                      selectedObject === object.title // Comprobar si el objeto está seleccionado
                        ? classes.elementoSeleccionado
                        : classes.textContent
                    }
                  >
                    {object.title}
                    
                  </Typography>
                </div>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box className={classes.itemContainer}>
      <Link
        to={to!}
        underline="none"
        className={classnames(
          classes.item,
          isActive ? classes.selected : undefined,
        )}
        onClick={closeSubmenu}
        onTouchStart={e => e.stopPropagation()}
      >
        {Icon && <Icon fontSize="small" />}
        <Typography
          variant="subtitle1"
          component="span"
          className={classes.label}
        >
          {title}
        </Typography>
      </Link>
    </Box>
  );
};


