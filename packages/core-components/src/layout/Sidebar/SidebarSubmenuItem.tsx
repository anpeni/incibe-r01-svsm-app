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
import { useSidebarOpenState } from './SidebarOpenStateContext';
import { ExpandLess, ExpandLessOutlined } from '@material-ui/icons';
import { ExpandMore, ExpandMoreOutlined } from '@material-ui/icons';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    item: {
      fontSize: '16px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      // fontWeight: '500',//regular
      //color: 'rgba(255, 255, 255, 0.60)',
      lineHeight: '1.57',
      height: 48,
      width: '100%',
      // '&:hover': {
      //   background:
      //   theme.palette.navigation.navItem?.hoverBackground || '#6f6f6f',
      //   color: theme.palette.navigation.selectedColor,
      // },
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.navigation.color,
      padding: theme.spacing(2.5),
      cursor: 'pointer',
      position: 'relative',
      //background: 'none',
      border: 'none',
    },
    itemContainer: {
      width: '100%',

    },
    selected: {
      background: 'rgba(6, 11, 40, 0.8)',
      //color: theme.palette.common.white,
      color: '#FFF',

    },
    label: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1),
      //fontSize: theme.typography.body2.fontSize,
      fontSize: 16,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      lineHeight: 1,
      color: 'rgba(255, 255, 255, 0.60)',
    },
    labelSelected: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1),
      //fontSize: theme.typography.body2.fontSize,
      fontSize: 16,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      lineHeight: 1,
      color: 'white',
    },
    subtitle: {
      fontSize: 10,
      color: 'white',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
    },
    dropdownArrow: {
      position: 'absolute',
      right: 51,
    },
    expandClose: {
      position: 'absolute',
      right: 51,
      color: 'rgba(255, 255, 255, 0.30)',
    },
    expandOpen: {
      position: 'absolute',
      right: 51,
      color: '#fff',
    },
    dropdown: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      marginLeft: '-5px',
    },
    dropdownItem: {
      width: '100%',
      padding: '10px 0 10px 0',
      '&:hover': {
        background:'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
        //color: 'white',
      },
    },
    icono: {
      color: 'rgba(255, 255, 255, 0.30)',
      marginLeft: '6px',
    },
    iconoSelect: {
      color: '#FFF',
      marginLeft: '6px',
    },
    iconocentrado: {

      marginLeft: '6px',

      //background: 'rgba(6, 11, 40, 0.8)',
    },
    textContent: {
      color: 'rgba(255, 255, 255, 0.60)',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(1),
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      marginLeft: '-18px',
    },
    textContentSelected: {
      color: '#FFF',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(1),
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
    },

  }),
  { name: 'BackstageSidebarSubmenuItem' },
);

/**
 * Clickable item displayed when submenu item is clicked.
 * title: Text content of item
 * to: Path to navigate to when item is clicked
 *
 * @public
 */
export type SidebarSubmenuItemDropdownItem = {
  title: string;
  to: string;
};
/**
 * Holds submenu item content.
 *
 * @remarks
 * title: Text content of submenu item
 * subtitle: A subtitle displayed under the main title
 * to: Path to navigate to when item is clicked
 * icon: Icon displayed on the left of text content
 * dropdownItems: Optional array of dropdown items displayed when submenu item is clicked.
 *
 * @public
 */
export type SidebarSubmenuItemProps = {
  title: string;
  subtitle?: string;
  to?: string;
  icon?: IconComponent | OverridableComponent<SvgIconTypeMap>;
  dropdownItems?: SidebarSubmenuItemDropdownItem[];
  exact?: boolean;
};

/**
 * Item used inside a submenu within the sidebar.
 *
 * @public
 */
export const SidebarSubmenuItem = (props: SidebarSubmenuItemProps) => {
  const { title, subtitle, to, icon: Icon, dropdownItems, exact } = props;
  const classes = useStyles();
  const { setIsHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  const closeSubmenu = () => {
    setIsHoveredOn(false);
  };
  const toLocation = useResolvedPath(to ?? '');
  const currentLocation = useLocation();
  let isActive = isLocationMatch(currentLocation, toLocation, exact);

  const [showDropDown, setShowDropDown] = useState(false);
  const handleClickDropdown = () => {
    setShowDropDown(!showDropDown);
  };
  if (dropdownItems !== undefined) {
    dropdownItems.some(item => {
      const resolvedPath = resolvePath(item.to);
      isActive = isLocationMatch(currentLocation, resolvedPath, exact);
      return isActive;
    });

    const { isOpen } = useSidebarOpenState();
    return (
      <>
        {isOpen ? (
          <Box className={classes.itemContainer}>
            <Tooltip title={title} enterDelay={500} enterNextDelay={500}>
              <Button
                role="button"
                onClick={handleClickDropdown}
                //onMouseEnter={handleClickDropdown}
                //onMouseLeave={handleClickDropdown}
                onTouchStart={e => e.stopPropagation()}
                className={classnames(
                  classes.item,
                  showDropDown ? classes.selected : undefined,
                )}
              >
                {Icon &&
                  <Icon
                    fontSize="small"
                    className={classnames(

                      showDropDown ? classes.iconoSelect : classes.icono,
                    )} />}
                <Typography
                  component="span"
                  className={classnames(
                    showDropDown ? classes.labelSelected : classes.label,
                  )
                  }
                >
                  {title}
                  <br />
                </Typography>

                {showDropDown ? (
                  <ExpandLess className={classes.expandOpen} />
                ) : (
                  <ExpandMore className={classes.expandClose} />
                )}

              </Button>
            </Tooltip>
            {dropdownItems && showDropDown && (
              <div style={{ height: 'auto', padding: '0', position: 'relative', marginLeft: '35px' }}>
                {showDropDown && (<div style={{
                  height: 'calc(100% - 19px)',  // 20px menos que el contenedor
                  borderLeft: '2px solid rgba(255, 255, 255, 0.30)',
                  position: 'absolute',  // Posicionado de manera absoluta dentro del div padre
                  top: '0'  // Alineado con la parte superior del div padre
                }}></div>)}
                <Box className={classes.dropdown}>
                  {dropdownItems.map((object, key) => (
                    <Tooltip
                      key={key}
                      title={object.title}
                      enterDelay={500}
                      enterNextDelay={500}
                    >
                      <Link
                        to={object.to}
                        underline="none"
                        className={classes.dropdownItem}
                        onClick={closeSubmenu}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                          {showDropDown &&
                            (<div style={{
                              width: '10px',
                              borderBottom: '2px solid rgba(255, 255, 255, 0.30)',
                              marginLeft: '6.5px'
                            }}>

                            </div>)}
                          <Typography component="span"
                            className={classnames(
                              //showDropDown ? classes.textContentSelected : classes.textContent,
                              classes.textContent
                            )}
                          >
                            {object.title}
                          </Typography>

                        </div>
                      </Link>
                    </Tooltip>
                  ))}
                </Box>
              </div>

            )}

          </Box>
        ) : (
          <Box className={classes.itemContainer}>
            <Tooltip title={title} enterDelay={500} enterNextDelay={500}>
              <Button
                role="button"
                onClick={handleClickDropdown}
                onTouchStart={e => e.stopPropagation()}
                className={classnames(
                  classes.item,
                  showDropDown ? classes.selected : undefined,
                )}
              >
                {Icon &&
                  <Icon
                    fontSize="small"
                    className={classnames(
                      showDropDown ? classes.iconoSelect : classes.icono,
                      showDropDown ? classes.iconocentrado : classes.iconocentrado,
                    )} />}


              </Button>

            </Tooltip>
            {showDropDown && (<div style={{ height: '100px', borderLeft: '2px solid rgba(255, 255, 255, 0.30)', marginLeft: '35px' }}></div>)}
            {/* {dropdownItems && showDropDown && (
              <div style={{ height: 'auto', padding: '0', position: 'relative', marginLeft: '35px' }}>
                {showDropDown && (<div style={{
                  height: 'calc(100% - 19px)',  // 20px menos que el contenedor
                  borderLeft: '2px solid rgba(255, 255, 255, 0.30)',
                  position: 'absolute',  // Posicionado de manera absoluta dentro del div padre
                  top: '0'  // Alineado con la parte superior del div padre
                }}></div>)}
                <Box className={classes.dropdown}>
                  {dropdownItems.map((object, key) => (
                    <Tooltip
                      key={key}
                      title={object.title}
                      enterDelay={500}
                      enterNextDelay={500}
                    >
                      <Link
                        to={object.to}
                        underline="none"
                        className={classes.dropdownItem}
                        onClick={closeSubmenu}
                        onTouchStart={e => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                          {showDropDown &&
                            (<div style={{
                              width: '10px',
                              borderBottom: '2px solid rgba(255, 255, 255, 0.30)',
                              marginLeft: '6.5px'
                            }}>

                            </div>)}
                          <Typography component="span"
                            className={classnames(
                              //showDropDown ? classes.textContentSelected : classes.textContent,
                              classes.textContent
                            )}
                          >
                            {object.title}
                          </Typography>

                        </div>
                      </Link>
                    </Tooltip>
                  ))}
                </Box>
              </div>

            )} */}

          </Box>         
        )}
      </>
    );
  }

  return (
    <Box className={classes.itemContainer}>
      <Tooltip title={title} enterDelay={500} enterNextDelay={500}>
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
            <br />
            {subtitle && (
              <Typography
                variant="caption"
                component="span"
                className={classes.subtitle}
              >
                {subtitle}
              </Typography>
            )}
          </Typography>
        </Link>
      </Tooltip>
    </Box>
  );
};
