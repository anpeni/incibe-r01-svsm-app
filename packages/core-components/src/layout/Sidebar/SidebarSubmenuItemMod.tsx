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
import { SidebarSubmenuMod } from './SidebarSubmenuMod';
import { SidebarSubmenuItemFloat } from './SidebarSubmenuItemFloat';
import { vars } from '../../../../app/src/themes/variables';
const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    item: {
      fontSize: '16px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      lineHeight: '1.57',
      height: 48,
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.navigation.color,
      padding: theme.spacing(2.5),
      cursor: 'pointer',
      position: 'relative',
      border: 'none',
      margingLeft: '-16px'
    },
    sombreado: {
      marginLeft: '18px',
      borderRadius: '12px',
      paddingLeft: '0px',
      width: '185px',
      '&:hover': {
        background: `${theme.palette.type === 'dark'
          ? vars.dark.background.highlight
          : vars.light.background.white
          }`,
      },
    },
    sombreado2: {
      '&:hover': {
        background: `${theme.palette.type === 'dark'
          ? vars.dark.background.highlight
          : vars.light.background.white
          }`,
        borderRadius: '12px',
      },
      marginLeft: '13px',
      width: '48px',
    },
    itemIcono: {
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
    },

    itemContainer: {
      width: '100%',
    },
    selected: {
      background: `${theme.palette.type === 'dark'
        ? vars.dark.background.highlight
        : vars.light.background.white
        }`,
      color: `${theme.palette.type === 'dark' ? '#FFF ' : 'rgba(6, 11, 40, 0.8)'
        }`,
      borderRadius: '9px',
      width: '185px',
      marginLeft: '0px',
      borderLeft: `solid 9px ${vars.light.background.accent}`,
    },
    selectedCerrado: {
      background: `${theme.palette.type === 'dark'
        ? vars.dark.background.highlight
        : vars.light.background.white
        }`,
      width: 1,
      marginLeft: '-2px',
      minWidth: '50px',
      widht: '20px',
      
    },
    label: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1.5),
      fontSize: 16,
      fontWeight: 'lighter',
      whiteSpace: 'nowrap',
      //overflow: 'hidden',
      fontFamily: 'Inter, sans-serif !important',
      'text-overflow': 'ellipsis',
      lineHeight: 1,
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : 'RGB(6, 11, 40)'
        }`,
    },
    labelSelected: {
      margin: theme.spacing(1.75),
      marginLeft: theme.spacing(1.5),
      fontSize: 16,
      fontWeight: "lighter",
      whiteSpace: 'nowrap',
      //overflow: 'hidden',
      fontFamily: 'Inter, sans-serif !important',
      'text-overflow': 'ellipsis',
      lineHeight: 1,
      color: `${theme.palette.type === 'dark'
        ? vars.dark.background.white
        : vars.light.background.accent
        }`,
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
      fontWeight: 'bold',
      right: -33,
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : 'rgba(6, 11, 40)'
        }`,
    },
    expandOpen: {
      position: 'absolute',
      right: 6,
      color: `${theme.palette.type === 'dark'
        ? vars.dark.background.white
        : vars.light.background.accent
        }`,
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
    },
    dropdownItemSeleccionado: {
      width: '100%',
      padding: '10px 20px 10px 0',
    },
    icono: {
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : 'rgba(6, 11, 40)'
        }`,
      marginLeft: '5px',
    },
    iconoSelect: {
      color: vars.dark.background.accent,
      marginLeft: '-4px',
    },
    iconoSelectCerrado: {
      color: vars.dark.background.accent,
      marginLeft: '-5px',

    },
    iconocentrado: {
    },
    iconocentradoCerrado: {
      marginLeft: '-7px',
    },

    textContent: {
      color: `${theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.60)' : 'rgba(6, 11, 40, 0.80)'
        }`,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(1),
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      marginLeft: '-18px',
    },
    textContentOscuro: {
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
        background: vars.dark.background.highlight,
        borderRadius: '12px',
        padding: '10px 80px 10px 15px',
        marginLeft: '-1px',
      },
    },
    textContentClaro: {
      color: 'rgba(6, 11, 40, 0.8)',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(1),
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      marginLeft: '-18px',
      '&:hover': {
        borderRadius: '12px',
        padding: '10px 80px 10px 15px',
        marginLeft: '-1px',
      },
    },
    textContentSelected: {
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'rgba(6, 11, 40)'
        }`,
      fontSize: '13px',//16px
      fontFamily: 'Inter, sans-serif',//inter
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      marginLeft: '-1px',
      background: `${theme.palette.type === 'dark'
          ? vars.dark.background.highlight
          : vars.light.background.white
        }`,
      padding: '10px 80px 10px 15px',
      borderRadius: '12px',
    },
    divMenu: {
      height: 'auto',
      padding: '0',
      position: 'relative',
      marginLeft: '53px'
    },
    divMenuCerrado: {
      height: 'auto',
      padding: '0',
      position: 'relative',
      marginLeft: '35px'
    },
    lineaVertical: {
      height: 'calc(100% - 20px)',  // 20px menos que el contenedor
      borderLeft: `${theme.palette.type === 'dark' ? '2px solid rgba(255, 255, 255, 0.30)' : '2px solid black'
        }`,
      position: 'absolute',  // Posicionado de manera absoluta dentro del div padre
      top: '0'  // Alineado con la parte superior del div padre
    },
    lineaHorizontal: {
      width: '10px',
      borderBottom: `${theme.palette.type === 'dark' ? '2px solid rgba(255, 255, 255, 0.30)' : '2px solid black'
        }`,
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


export type SidebarSubmenuItemDropdownItemMod = {
  title: string;
  to: string;
};

export type SidebarSubmenuItemPropsMod = {
  title: string;
  subtitle?: string;
  to?: string;
  icon?: IconComponent | OverridableComponent<SvgIconTypeMap>;
  dropdownItems?: SidebarSubmenuItemDropdownItemMod[];
  exact?: boolean;
  selectedObject?: any;
  showDropDown: boolean;
  setShowDropDown: (show: boolean) => void; // Actualizado para especificar el tipo de función
};
export const SidebarSubmenuItemMod = (props: SidebarSubmenuItemPropsMod) => {
  const { title, subtitle, to, icon: Icon, dropdownItems, exact, showDropDown, setShowDropDown } = props;
  const classes = useStyles();
  const { setIsHoveredOn } = useContext(SidebarItemWithSubmenuContext);
  const closeSubmenu = () => {
    setIsHoveredOn(false);
  };
  const toLocation = useResolvedPath(to ?? '');
  const currentLocation = useLocation();
  const [selectedObject, setSelectedObject] = useState(null);
  let isActive = isLocationMatch(currentLocation, toLocation, exact);

  //const [showDropDown, setShowDropDown] = useState(false);
  const handleClickDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleObjectClick = (object: { title: any; to?: string; }) => {
    setSelectedObject(object.title);
  };

  const handleSelectedObjectChange = (newSelectedObject: any) => {
    console.log("newSelectedObject.title: " + newSelectedObject.title);
    setSelectedObject(newSelectedObject.title);

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
          // <Box className={classes.itemContainer}>
          <>
            <Box className={classes.itemContainer}>
              <div className={classes.sombreado}>
                <Button
                  role="button"
                  onClick={handleClickDropdown}
                  onTouchStart={e => e.stopPropagation()}
                  className={classnames(
                    classes.item,
                    (showDropDown ? classes.selected : undefined)
                  )}>
                  {Icon &&
                    <Icon
                      fontSize="small"
                      className={classnames(
                        showDropDown ? classes.iconoSelect : classes.icono,
                      )} />
                  }
                  <Typography
                    component="span"
                    className={classnames(
                      showDropDown ? classes.labelSelected : classes.label,
                    )}>
                    {title}
                    <br />
                  </Typography>
                  {showDropDown ? (
                    <ExpandLess className={classes.expandOpen} />
                  ) : (
                    <ExpandMore className={classes.expandClose} />
                  )}
                </Button>
              </div>
              {dropdownItems && showDropDown && (
                <div className={classes.divMenu}>
                  {showDropDown && (<div className={classes.lineaVertical}></div>)}
                  <Box className={classes.dropdown}>
                    {dropdownItems.map((object, key) => (
                      <Link
                        to={object.to}
                        underline="none"
                        className={
                          location.pathname === object.to
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
                                location.pathname === object.to  // Comprobar si el objeto está seleccionado
                                  ? classes.textContentSelected
                                  : classes.textContent
                              }>
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
            {/* <div>{showDropDown ? 'Abierto' : 'Cerrado'}</div> */}
          </>
        ) : (
          <Box >
            <div className={classes.sombreado2}>
              <Button
                role="button"
                onClick={handleClickDropdown}
                onTouchStart={e => e.stopPropagation()}
                className={classnames(
                  (showDropDown ? `${classes.selectedCerrado} ${classes.itemIcono}` : classes.itemIcono)
                )}
              >
                {Icon &&
                  <Icon
                    fontSize="small"
                    className={classnames(
                      (showDropDown ? `${classes.iconoSelectCerrado}` : `${classes.icono} ${classes.iconocentradoCerrado}`)
                    )} />}
              </Button>
            </div>
            {dropdownItems && showDropDown && (
              <div className={classes.divMenuCerrado}>
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
                              classes.textContentOscuro
                            )}
                          >
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Box>
                <div className={classnames(classes.contenedorSubmenuFlotante)}>
                  <SidebarSubmenuMod >
                    <SidebarSubmenuItemFloat
                      selectedFromParent={selectedObject}
                      dropdownItems={dropdownItems}
                      onSelectedObjectChange={handleSelectedObjectChange}
                    />
                  </SidebarSubmenuMod>
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

type OtroComponenteProps = {
  showDropDown: boolean;
};

// Usa el tipo en la definición del componente
export const OtroComponenteMod: React.FC<OtroComponenteProps> = ({ showDropDown }) => {
  return (
    <div>
      {showDropDown ? 'Abierto' : 'Cerrado'}
    </div>
  );
};