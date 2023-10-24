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
import { vars } from '../../../../app/src/themes/variables';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    dropdown: {
      display: 'flex',
      flexDirection: 'column',
    },
    dropdownItem: {
      '&:hover': {},
    },
    textContent: {
      color: `${
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, 0.60)'
          : 'rgba(6, 11, 40, 0.8)'
      }`,
      fontFamily: 'Inter, sans-serif',
      paddingLeft: 20,
      fontSize: '13px',
      '&:hover': {
        background: `${
          theme.palette.type === 'dark'
            ? vars.dark.background.card
            : vars.light.background.white
        }`,
        marginLeft: '8px',
        borderRadius: '10px',
        padding: '5px 12px 5px 12px',
      },
    },
    elementoSeleccionado: {
      color: `${theme.palette.type === 'dark' ? 'white' : 'rgba(6, 11, 40)'}`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      marginLeft: '8px',
      background: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.white
      }`,
      borderRadius: '10px',
      padding: '5px 12px 5px 12px',
    },
    contenedor: {
      height: '39px',
      width: '100px',
      display: 'flex',
      alignItems: 'center',
    },
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

export const SidebarSubmenuItemModificado = (
  props: SidebarSubmenuItemProps,
) => {
  const {
    title,
    to,
    icon: Icon,
    dropdownItems,
    exact,
    selectedFromParent,
  } = props;
  const classes = useStyles();
  const [selectedObject, setSelectedObject] = useState(selectedFromParent);
  const { setIsHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  const closeSubmenu = () => {
    setIsHoveredOn(false);
  };
  const toLocation = useResolvedPath(to ?? '');
  const currentLocation = useLocation();
  let isActive = isLocationMatch(currentLocation, toLocation, exact);

  const handleObjectClick = (object: any) => {
    setSelectedObject(object.title); // Aquí asumo que cada objeto tiene un título único. Puedes usar cualquier propiedad única.
    if (props.onSelectedObjectChange) {
      props.onSelectedObjectChange(object);
    }
  };

  if (dropdownItems !== undefined) {
    dropdownItems.some(item => {
      const resolvedPath = resolvePath(item.to);
      isActive = isLocationMatch(currentLocation, resolvedPath, exact);
      return isActive;
    });
    return (
      <Box className={classes.dropdown}>
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
            <div className={classes.contenedor}>
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
