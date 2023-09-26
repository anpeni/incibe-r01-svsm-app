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
import { ExpandLess, ExpandLessOutlined, Height } from '@material-ui/icons';
import { ExpandMore, ExpandMoreOutlined } from '@material-ui/icons';
import { SidebarSubmenu } from './SidebarSubmenu';
import { SidebarSubmenuItemModificado } from './SidebarSubmenuItemModificado';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    item: {
      fontSize: '16px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      lineHeight: '1.57',
      height: 48,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.navigation.color,
      padding: theme.spacing(2.5),
      cursor: 'pointer',
      position: 'relative',
      border: 'none',
      '&:hover': {
        background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      },
      contenedorSubmenuFlotante: {
        // position: 'fixed',
        // top: '0',
        // left: '0',
        //background: 'red'
      },

    },
    itemContainer: {
      width: '100%',

    },
    selected: {
      background: 'rgba(6, 11, 40, 0.8)',
      color: '#FFF',
      borderRadius: '12px',
      

    },
    label: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1),
      fontSize: 16,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      lineHeight: 1,
      color: 'rgba(255, 255, 255, 0.60)',
    },

    sombreadoItem: {
      //background: 'red',
      //minWidth: '500',  
    },
    labelSelected: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1),
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
      // '&:hover': {
      //   background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      //   borderRadius: '12px',
      // },
      
    },
    dropdownItemSeleccionado: {
      width: '100%',
      padding: '10px 20px 10px 0',
      // '&:hover': {
      //   background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      //   borderRadius: '12px',
      // },
      //background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      //borderRadius: '12px',
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
      '&:hover': {
        background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
        borderRadius: '12px',
        padding: '10px 80px 10px 15px',
        //paddingRight: theme.spacing(10),
        marginLeft: '-1px',
      },
      
    },
    textContentSelected: {
      color: '#FFF',
      //paddingLeft: theme.spacing(4),
      //paddingRight: '100%',
      //Width: '400px',
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      marginLeft: '-1px',
      background: 'var(--Color-Dark, linear-gradient(173deg, rgba(6, 11, 40, 0.75) 5.57%, rgba(6, 11, 40, 0.70) 166.22%))',
      padding: '10px 80px 10px 15px',
      borderRadius: '12px',
      //marginRight: '100px',
      //Width: '300px',

    },
    divMenu: {
      height: 'auto',
      padding: '0',
      position: 'relative',
      marginLeft: '35px'
    },
    lineaVertical: {
      height: 'calc(100% - 20px)',  // 20px menos que el contenedor
      borderLeft: '2px solid rgba(255, 255, 255, 0.30)',
      position: 'absolute',  // Posicionado de manera absoluta dentro del div padre
      top: '0'  // Alineado con la parte superior del div padre
    },
    lineaHorizontal: {
      width: '10px',
      borderBottom: '2px solid rgba(255, 255, 255, 0.30)',
      marginLeft: '6.5px'
    },
    divLineaHorizontalItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }

  }),
  { name: 'BackstageSidebarSubmenuItem' },
);


export type SidebarSubmenuItemDropdownItem = {
  title: string;
  to: string;
};

export type SidebarSubmenuItemProps = {
  title: string;
  subtitle?: string;
  to?: string;
  icon?: IconComponent | OverridableComponent<SvgIconTypeMap>;
  dropdownItems?: SidebarSubmenuItemDropdownItem[];
  exact?: boolean;
  selectedObject?: any;
};


export const SidebarSubmenuItem = (props: SidebarSubmenuItemProps) => {
  const { title, subtitle, to, icon: Icon, dropdownItems, exact } = props;
  const classes = useStyles();
  const { setIsHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  const closeSubmenu = () => {
    setIsHoveredOn(false);
  };

  const toLocation = useResolvedPath(to ?? '');
  const currentLocation = useLocation();
  const [selectedObject, setSelectedObject] = useState(null);
  let isActive = isLocationMatch(currentLocation, toLocation, exact);

  const [showDropDown, setShowDropDown] = useState(false);
  const handleClickDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleObjectClick = (object: { title: any; to?: string; }) => {
    setSelectedObject(object.title);
  };

  const handleSelectedObjectChange = (newSelectedObject: any) => {
    console.log("newSelectedObject.title: " + newSelectedObject.title);
    setSelectedObject(newSelectedObject.title );

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
            
            {dropdownItems && showDropDown && (
              <div className={classes.divMenu}>
                {showDropDown && (<div className={classes.lineaVertical}></div>)}
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
                      <div className={classes.divLineaHorizontalItem}>
                        {showDropDown &&
                          (<div className={classes.lineaHorizontal}></div>)}
                        <div className={classnames(classes.sombreadoItem)}>
                          <Typography component="span"
                            className={
                              selectedObject === object.title // Comprobar si el objeto está seleccionado
                                ? classes.textContentSelected
                                : classes.textContent
                            }
                          >
                            {object.title}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Box>
              </div>

            )}
          </Box>


        ) : (
          <Box className={classes.itemContainer}>
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
            {dropdownItems && showDropDown && (
              <div className={classes.divMenu}>
                {showDropDown && (<div className={classes.lineaVertical}></div>)}
                <Box className={classes.dropdown}>
                  {dropdownItems.map((object, key) => (
                    <Link
                      to={object.to}
                      underline="none"
                      className={classes.dropdownItem}
                      onClick={closeSubmenu}
                      onTouchStart={e => e.stopPropagation()}
                    >
                      <div className={classes.divLineaHorizontalItem}>
                        {showDropDown &&
                          (<div className={classes.lineaHorizontal}>
                          </div>)}
                        <div className={classnames(classes.sombreadoItem)}>
                          <Typography component="span"
                            className={classnames(
                              //showDropDown ? classes.textContentSelected : classes.textContent,
                              classes.textContent
                            )}
                          >
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Box>
                <div className={classnames(classes.contenedorSubmenuFlotante)}>
                  <SidebarSubmenu >
                    <SidebarSubmenuItemModificado
                      selectedFromParent={selectedObject}
                      dropdownItems={dropdownItems}
                      onSelectedObjectChange={handleSelectedObjectChange}
                    />
                  </SidebarSubmenu>
                </div>
              </div>
            )}
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
