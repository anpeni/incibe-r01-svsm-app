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
import {
  IconComponent,
  useAnalytics,
  useElementFilter,
} from '@backstage/core-plugin-api';
import { BackstageTheme } from '@backstage/theme';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import { makeStyles, styled, Theme } from '@material-ui/core/styles';
import {
  CreateCSSProperties,
  StyledComponentProps,
} from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import classnames from 'classnames';
import { Location } from 'history';
import React, {
  ComponentProps,
  ComponentType,
  CSSProperties,
  forwardRef,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  NavLinkProps,
  resolvePath,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';

import {
  SidebarConfig,
  SidebarConfigContext,
  SidebarItemWithSubmenuContext,
} from './config';
import { useSidebarOpenState } from './SidebarOpenStateContext';
import { SidebarSubmenuMod, SidebarSubmenuPropsMod } from './SidebarSubmenuMod';
import { SidebarSubmenuItemPropsMod } from './SidebarSubmenuItemMod';
import { isLocationMatch } from './utils';
import Button from '@material-ui/core/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@material-ui/icons';
import { vars } from '../../../../app/src/themes/variables';
/** @public */
export type SidebarItemClassKeyMod =
  | 'root'
  | 'buttonItem'
  | 'closed'
  | 'open'
  | 'highlightable'
  | 'highlighted'
  | 'label'
  | 'iconContainer'
  | 'searchRoot'
  | 'searchField'
  | 'searchFieldHTMLInput'
  | 'searchContainer'
  | 'secondaryAction'
  | 'closedItemIcon'
  | 'submenuArrow'
  | 'expandButton'
  | 'arrows'
  | 'selected';

const makeSidebarStyles = (sidebarConfig: SidebarConfig) =>
  makeStyles<BackstageTheme>(
    theme => ({
      root: {
        color: `${
          theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.60)'
            : 'RGB(6, 11, 40)'
        }`,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        height: 48,
        cursor: 'pointer',
      },
      divCloseNoButton:{
        display: 'flex',        
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '48px',
        height: '48px',
        marginLeft:'12px',
        color: `${
          theme.palette.type === 'dark'
            ? 'rgba(255, 255, 255, 0.60)'
            : 'RGB(6, 11, 40)'
        }`,

        borderRadius: '9px',
        '&:hover': {
          background: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.highlight
              : vars.light.background.white + '!important'
          }`,
      },
    },
    buttonSearchNull:{
      position: 'relative',

      '&:hover': {
        background: `${
          theme.palette.type === 'dark'
            ? 'none !important'
            : 'none !important'
        }`,
    },
  },
      buttonItem: {
        background: 'none',
        border: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
        textAlign: 'inherit',
        font: 'inherit',
        textTransform: 'none',
        
        
      },
      closed: {
        width: sidebarConfig.drawerWidthClosed,
        justifyContent: 'center',
      },
      open: {
        [theme.breakpoints.up('sm')]: {
          width: sidebarConfig.drawerWidthOpen,
        },
      },
      highlightable: {
        '&$root': {
          borderRadius: '9px',
          width: '185px ',
          position: 'relative',
          left: '20px',

          '&:hover': {
            background: `${
              theme.palette.type === 'dark'
                ? vars.dark.background.highlight
                : vars.light.background.white + '!important'
            }`,
            borderadius: '12px !important',
            marginLeft:'0px'
          
          },        
          
        },
        '&$closed': {
          borderLeft: `none`,
          width: '50px',
          marginLeft: '-8px',
          
        },
        '& $closedItemIcon': {
          paddingRight: sidebarConfig.selectedIndicatorWidth,
        },
        '& $iconContainer': {
          marginLeft: '5px',        
        },
        '& $label': {
          marginLeft: '-5px',         
        },
        },
        highlightableCerrado: {
          '&$root': {
            borderRadius: '9px',
            width: '185px ',
            position: 'relative',
            left: '20px'           
          },
          '&$closed': {
            borderLeft: `none`,
            width: '50px',
            marginLeft: '-8px',
            '&:hover': {
              background: `${
                theme.palette.type === 'dark'
                  ? vars.dark.background.highlight
                  : vars.light.background.white + '!important'
              }`,
              borderadius: '12px !important',
              marginLeft:'-8px'         
            },  
            
          },
          '& $closedItemIcon': {
            paddingRight: sidebarConfig.selectedIndicatorWidth,
            
          },
          '& $iconContainer': {
            marginLeft: '5px',
  
            
          },
          '& $label': {
            marginLeft: '-5px',
            
          },
          },

      highlighted: {
        

      },
      label: {
        // XXX (@koroeskohr): I can't seem to achieve the desired font-weight from the designs
        fontWeight: 'lighter',
        whiteSpace: 'nowrap',
        lineHeight: 'auto',
        flex: '3 1 auto',
        width: '110px',
        marginLeft: '-10px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        
      },
      iconContainer: {
        boxSizing: 'border-box',
        height: '100%',
        width: sidebarConfig.iconContainerWidth,
        marginLeft: '21px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '0',

        
        
      },
      searchRoot: {
        marginBottom: 12,
      },
      searchField: {
        color: '#b5b5b5',
        fontWeight: theme.typography.fontWeightBold as any,
        fontSize: theme.typography.fontSize,
      },
      searchFieldHTMLInput: {
        padding: theme.spacing(2, 0, 2),
      },
      searchContainer: {
        width: sidebarConfig.drawerWidthOpen - sidebarConfig.iconContainerWidth,
      },
      secondaryAction: {
        width: theme.spacing(6),
        textAlign: 'center',
        marginRight: theme.spacing(1),
      },
      closedItemIcon: {
        width: '100%',
        justifyContent: 'center',
        
        

      },
      submenuArrow: {
        display: 'flex',
      },
      expandButton: {
        background: 'none',
        border: 'none',
        width: '100%',
        position: 'relative',
        height: 48,
        '&:hover': {
          background: 'none',
        },
      },
      arrows: {
        position: 'relative',
        color: vars.light.fontColor.white,
      },
      circuloarrow: {
        position: 'absolute',
        right: -7,
        width: '25px',  
        height: '25px', 
        backgroundColor: vars.dark.background.accent, 
        borderRadius: '50%', 
      },
      selected: {
        '&$root': {
          borderRadius: '9px',
          borderLeft: `solid 9px ${vars.light.background.accent}`,
          width: '185px ',
          position: 'relative',
          left: '20px',
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.white + '!important'
              : vars.light.background.accent + ' !important'
          }`,
          background: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.highlight
              : vars.light.background.white + '!important'
          }`,
          '&:hover': {
            background: `${
              theme.palette.type === 'dark'
                ? vars.dark.background.highlight
                : vars.light.background.white + '!important'
            }`,
            borderadius: '12px !important',
            marginLeft:'0px'
          },
          
          
        },
        '&$closed': {
          borderLeft: `none`,
          width: '50px',
          marginLeft: '-8px',
        },
        '& $closedItemIcon': {
          paddingRight: sidebarConfig.selectedIndicatorWidth,
          color:vars.light.background.accent,
          

        },
        '& $iconContainer': {
          marginLeft: '-4px',
          color:vars.light.background.accent,
          
        },
        '& $label': {
          marginLeft: '-5px',
          
        },
      },
      selectedCerrado: {
        '&$root': {
          borderRadius: '9px',
          borderLeft: `solid 9px ${vars.light.background.accent}`,
          width: '185px ',
          position: 'relative',
          left: '20px',
          color: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.white + '!important'
              : vars.light.background.accent + ' !important'
          }`,
          background: `${
            theme.palette.type === 'dark'
              ? vars.dark.background.highlight
              : vars.light.background.white + '!important'
          }`,
          '&:hover': {
            background: `${
              theme.palette.type === 'dark'
                ? vars.dark.background.highlight
                : vars.light.background.white + '!important'
            }`,
            borderadius: '12px !important',
            marginLeft:'-8px'
            //width: '185px '
          },
          
          
        },
        '&$closed': {
          borderLeft: `none`,
          width: '50px',
          marginLeft: '-8px',
        },
        '& $closedItemIcon': {
          paddingRight: sidebarConfig.selectedIndicatorWidth,
          color:vars.light.background.accent,
          

        },
        '& $iconContainer': {
          marginLeft: '-4px',
          color:vars.light.background.accent,
          //background:'red'
          
        },
        '& $label': {
          marginLeft: '-5px',
          //color:accentColorLight,
          //background:'blue'
          
        },
      },
    }),
    { name: 'BackstageSidebarItem' },
  );

// This is a workaround for this issue https://github.com/mui/material-ui/issues/15511
// The styling of the `selected` elements doesn't work as expected when using a prop callback.
// Don't use this pattern unless needed
function useMemoStyles(sidebarConfig: SidebarConfig) {
  const useStyles = useMemo(
    () => makeSidebarStyles(sidebarConfig),
    [sidebarConfig],
  );
  return useStyles();
}

/**
 * Evaluates the routes of the SubmenuItems & nested DropdownItems.
 * The reevaluation is only triggered, if the `locationPathname` changes, as `useElementFilter` uses memorization.
 *
 * @param submenu SidebarSubmenu component
 * @param location Location
 * @returns boolean
 */
const useLocationMatch = (
  submenu: React.ReactElement<SidebarSubmenuPropsMod>,
  location: Location,
): boolean =>
  useElementFilter(
    submenu.props.children,
    elements => {
      let active = false;
      elements
        .getElements()
        .forEach(
          ({
            props: { to, dropdownItems },
          }: {
            props: Partial<SidebarSubmenuItemPropsMod>;
          }) => {
            if (!active) {
              if (dropdownItems?.length) {
                dropdownItems.forEach(
                  ({ to: _to }) =>
                    (active =
                      active || isLocationMatch(location, resolvePath(_to))),
                );
                return;
              }
              if (to) {
                active = isLocationMatch(location, resolvePath(to));
              }
            }
          },
        );
      return active;
    },
    [location.pathname],
  );

type SidebarItemBaseProps = {
  icon: IconComponent | OverridableComponent<SvgIconTypeMap>;
  text?: string;
  hasNotifications?: boolean;
  hasSubmenu?: boolean;
  disableHighlight?: boolean;
  className?: string;
  noTrack?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
  showDropDown?: boolean;
  setShowDropDown?: (showDropDown: boolean) => void;
};

type SidebarItemButtonProps = SidebarItemBaseProps & {
  onClick: (ev: React.MouseEvent) => void;
  children?: ReactNode;
};

type SidebarItemLinkProps = SidebarItemBaseProps & {
  to: string;
  onClick?: (ev: React.MouseEvent) => void;
} & NavLinkProps;

type SidebarItemWithSubmenuProps = SidebarItemBaseProps & {
  to?: string;
  onClick?: (ev: React.MouseEvent) => void;
  children: ReactNode;
};

/**
 * SidebarItem with 'to' property will be a clickable link.
 * SidebarItem with 'onClick' property and without 'to' property will be a clickable button.
 * SidebarItem which wraps a SidebarSubmenu will be a clickable button which opens a submenu.
 */
type SidebarItemProps =
  | SidebarItemLinkProps
  | SidebarItemButtonProps
  | SidebarItemWithSubmenuProps;

function isButtonItem(
  props: SidebarItemProps,
): props is SidebarItemButtonProps {
  return (props as SidebarItemLinkProps).to === undefined;
}

const sidebarSubmenuType = React.createElement(SidebarSubmenuMod).type;

// TODO(Rugvip): Remove this once NavLink is updated in react-router-dom.
//               This is needed because react-router doesn't handle the path comparison
//               properly yet, matching for example /foobar with /foo.
export const WorkaroundNavLink = React.forwardRef<
  HTMLAnchorElement,
  NavLinkProps & { activeStyle?: CSSProperties; activeClassName?: string }
>(function WorkaroundNavLinkWithRef(
  {
    to,
    end,
    style,
    className,
    activeStyle,
    caseSensitive,
    activeClassName = 'active',
    'aria-current': ariaCurrentProp = 'page',
    ...rest
  },
  ref,
) {
  let { pathname: locationPathname } = useLocation();
  let { pathname: toPathname } = useResolvedPath(to);

  if (!caseSensitive) {
    locationPathname = locationPathname.toLocaleLowerCase('en-US');
    toPathname = toPathname.toLocaleLowerCase('en-US');
  }

  let isActive = locationPathname === toPathname;
  if (!isActive && !end) {
    // This is the behavior that is different from the original NavLink
    isActive = locationPathname.startsWith(`${toPathname}/`);
  }

  const ariaCurrent = isActive ? ariaCurrentProp : undefined;

  return (
    <Link
      {...rest}
      to={to}
      ref={ref}
      aria-current={ariaCurrent}
      style={{ ...style, ...(isActive ? activeStyle : undefined) }}
      className={classnames([
        className as string,
        isActive ? activeClassName : undefined,
      ])}
    />
  );
});

/**
 * Common component used by SidebarItem & SidebarItemWithSubmenu
 */
const SidebarItemBase = forwardRef<any, SidebarItemProps>((props, ref) => {
  const {
    icon: Icon,
    text,
    hasNotifications = false,
    hasSubmenu = false,
    disableHighlight = false,
    onClick,
    noTrack,
    children,
    className,
    showDropDown,
    setShowDropDown,
    ...navLinkProps
  } = props;
  const { sidebarConfig } = useContext(SidebarConfigContext);
  const classes = useMemoStyles(sidebarConfig);
  // XXX (@koroeskohr): unsure this is optimal. But I just really didn't want to have the item component
  // depend on the current location, and at least have it being optionally forced to selected.
  // Still waiting on a Q answered to fine tune the implementation
  const { isOpen } = useSidebarOpenState();

  const divStyle =
    !isOpen && hasSubmenu
      ? { display: 'flex', marginLeft: '20px' }
      : { lineHeight: '0' };

  const displayItemIcon = (
    <Box style={divStyle}>
      <Icon fontSize="small" />
      {!isOpen && hasSubmenu ? (
        <ChevronRightOutlined fontSize="small" />
      ) : (
        <></>
      )}
    </Box>
  );

  const itemIcon = (
    <Badge
      color="secondary"
      variant="dot"
      overlap="circular"
      invisible={!hasNotifications}
      className={classnames({ [classes.closedItemIcon]: !isOpen })}
    >
      {displayItemIcon}
    </Badge>
  );

  const openContent = (
    <>
      <Box data-testid="login-button" className={classes.iconContainer}>
        {itemIcon}
      </Box>
      {text && (
        <Typography
          variant="subtitle2"
          component="span"
          className={classes.label}
        >
          {text}
        </Typography>
      )}

      <div className={classes.secondaryAction}>{children}</div>
      {/* <div>
      {showDropDown ? 'Abierto' : 'Cerrado'}
    </div> */}
    </>
  );

  const content = isOpen ? openContent : itemIcon;

  const childProps = {
    onClick,
    className: classnames(
      className,
      classes.root,
      isOpen ? classes.open : classes.closed,
      isButtonItem(props) && classes.buttonItem,
      isOpen ? { [classes.highlightable]: !disableHighlight } : { [classes.highlightableCerrado]: !disableHighlight }
    ),
  };

  const analyticsApi = useAnalytics();
  const { pathname: to } = useResolvedPath(
    !isButtonItem(props) && props.to ? props.to : '',
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!noTrack) {
        const action = 'click';
        const subject = text ?? 'Sidebar Item';
        const options = to ? { attributes: { to } } : undefined;
        analyticsApi.captureEvent(action, subject, options);
      }
      onClick?.(event);
    },
    [analyticsApi, text, to, noTrack, onClick],
  );

  const handleClickDropdown = () => {
    if (setShowDropDown) {
      setShowDropDown(false);
    }
    
  };

const handleCombinedClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  handleClick(event);
  handleClickDropdown();
};

  if (isButtonItem(props)) {
    return (

      isOpen ?
      <Button 
        role="button"
        aria-label={text}
        {...childProps}
        //className={classes.selected}
        ref={ref}
        onClick={handleCombinedClick}
      >
        {content}
      </Button>
      :
      <div className={classes.divCloseNoButton} >
      <Button 
        role="button"
        aria-label={text}
        {...childProps}
        className={classes.buttonSearchNull}
        ref={ref}
        onClick={handleCombinedClick}
      >
        {content}
      </Button>
      </div>
    );
  }

  return (
    <WorkaroundNavLink
      {...childProps}
      activeClassName={isOpen? classes.selected : classes.selectedCerrado }
      to={props.to ? props.to : ''}
      ref={ref}
      aria-label={text ? text : props.to}
      {...navLinkProps}
      onClick={handleCombinedClick}
    >
      {content}
      
    </WorkaroundNavLink>
  );
});

const SidebarItemWithSubmenu = ({
  children,
  ...props
}: SidebarItemBaseProps & {
  children: React.ReactElement<SidebarSubmenuPropsMod>;
}) => {
  const { sidebarConfig } = useContext(SidebarConfigContext);
  const classes = useMemoStyles(sidebarConfig);
  const [isHoveredOn, setIsHoveredOn] = useState(false);
  const location = useLocation();
  const isActive = useLocationMatch(children, location);
  const isSmallScreen = useMediaQuery<BackstageTheme>((theme: BackstageTheme) =>
    theme.breakpoints.down('sm'),
  );

  const handleMouseEnter = () => {
    setIsHoveredOn(true);
  };
  const handleMouseLeave = () => {
    setIsHoveredOn(false);
  };

  const arrowIcon = () => {
    if (isSmallScreen) {
      return isHoveredOn ? (
        <ArrowDropUp fontSize="small" className={classes.submenuArrow} />
      ) : (
        <ArrowDropDown fontSize="small" className={classes.submenuArrow} />
      );
    }
    return (
      !isHoveredOn && (
        <ArrowRightIcon fontSize="small" className={classes.submenuArrow} />
      )
    );
  };

  return (
    <SidebarItemWithSubmenuContext.Provider
      value={{
        isHoveredOn,
        setIsHoveredOn,
      }}
    >
      <div
        data-testid="item-with-submenu"
        onMouseLeave={handleMouseLeave}
        onTouchStart={isHoveredOn ? handleMouseLeave : handleMouseEnter}
        onMouseEnter={handleMouseEnter}
        className={classnames(isHoveredOn && classes.highlighted)}
      >
        <SidebarItemBase
          hasSubmenu
          className={isActive ? classes.selected : ''}
          {...props}
        >
          {arrowIcon()}
        </SidebarItemBase>
        {isHoveredOn && children}
      </div>
    </SidebarItemWithSubmenuContext.Provider>
  );
};

/**
 * Creates a `SidebarItem`
 *
 * @remarks
 * If children contain a `SidebarSubmenu` component the `SidebarItem` will have a expandable submenu
 */
export const SidebarItemMod = forwardRef<any, SidebarItemProps>((props, ref) => {
  // Filter children for SidebarSubmenu components
  const [submenu] = useElementFilter(props.children, elements =>
    // Directly comparing child.type with SidebarSubmenu will not work with in
    // combination with react-hot-loader
    //
    // https://github.com/gaearon/react-hot-loader/issues/304#issuecomment-456569720
    elements.getElements().filter(child => child.type === sidebarSubmenuType),
  );

  if (submenu) {
    return (
      <SidebarItemWithSubmenu {...props}>
        {submenu as React.ReactElement<SidebarSubmenuPropsMod>}
      </SidebarItemWithSubmenu>
    );
  }

  return <SidebarItemBase {...props} ref={ref} />;
}) as (props: SidebarItemProps) => JSX.Element;

type SidebarSearchFieldProps = {
  onSearch: (input: string) => void;
  to?: string;
  icon?: IconComponent;
};

export function SidebarSearchFieldMod(props: SidebarSearchFieldProps) {
  const { sidebarConfig } = useContext(SidebarConfigContext);
  const [input, setInput] = useState('');
  const classes = useMemoStyles(sidebarConfig);
  const Icon = props.icon ? props.icon : SearchIcon;

  const search = () => {
    props.onSearch(input);
    setInput('');
  };

  const handleEnter: KeyboardEventHandler = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      search();
    }
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value);
  };

  const handleInputClick = (ev: React.MouseEvent<HTMLInputElement>) => {
    // Clicking into the search fields shouldn't navigate to the search page
    ev.preventDefault();
    ev.stopPropagation();
  };

  const handleItemClick = (ev: React.MouseEvent) => {
    // Clicking on the search icon while should execute a query with the current field content
    search();
    ev.preventDefault();
  };

  return (
    <Box className={classes.searchRoot}>
      <SidebarItemMod
        icon={Icon}
        to={props.to}
        onClick={handleItemClick}
        disableHighlight
        showDropDown// Asegúrate de que showDropDown tenga un valor booleano
        
      >
        <TextField
          placeholder="Search"
          value={input}
          onClick={handleInputClick}
          onChange={handleInput}
          onKeyDown={handleEnter}
          className={classes.searchContainer}
          InputProps={{
            disableUnderline: true,
            className: classes.searchField,
          }}
          inputProps={{
            className: classes.searchFieldHTMLInput,
          }}
                  />
      </SidebarItemMod>
          </Box>
  );
}

export type SidebarSpaceClassKeyMod = 'root';

export const SidebarSpaceMod = styled('div')(
  {
    flex: 1,
  },
  { name: 'BackstageSidebarSpace' },
) as ComponentType<ComponentProps<'div'> & StyledComponentProps<'root'>>;

export type SidebarSpacerClassKeyMod = 'root';

export const SidebarSpacerMod = styled('div')(
  {
    height: 8,
  },
  { name: 'BackstageSidebarSpacerMod' },
) as ComponentType<ComponentProps<'div'> & StyledComponentProps<'root'>>;

export type SidebarDividerClassKeyMod = 'root';

export const SidebarDividerMod = styled('hr')(
  ({ theme }) => ({
    height: 1,
    width: '100%',
    background: '#383838',
    border: 'none',
    margin: theme.spacing(1.2, 0),
  }),
  { name: 'BackstageSidebarDividerMod' },
) as ComponentType<ComponentProps<'hr'> & StyledComponentProps<'root'>>;

const styledScrollbar = (theme: Theme): CreateCSSProperties => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    backgroundColor: theme.palette.background.default,
    width: '5px',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.text.secondary,
    borderRadius: '5px',
  },
});

export const SidebarScrollWrapperMod = styled('div')(({ theme }) => {
  const scrollbarStyles = styledScrollbar(theme);
  return {
    flex: '0 1 auto',
    overflowX: 'hidden',
    width: 'calc(100% - 5px)',
    minHeight: '48px',
    overflowY: 'hidden',
    '@media (hover: none)': scrollbarStyles,
    '&:hover': scrollbarStyles,
  };
}) as ComponentType<ComponentProps<'div'> & StyledComponentProps<'root'>>;

/**
 * A button which allows you to expand the sidebar when clicked.
 *
 * @remarks
 * Use optionally to replace sidebar's expand-on-hover feature with expand-on-click.
 *
 * If you are using this you might want to set the `disableExpandOnHover` of the `Sidebar` to `true`.
 *
 * @public
 */
export const SidebarExpandButtonMod = () => {
  const { sidebarConfig } = useContext(SidebarConfigContext);
  const classes = useMemoStyles(sidebarConfig);
  const { isOpen, setOpen } = useSidebarOpenState();
  const isDarkMode = localStorage.getItem('theme') === 'neoris-dark';
  const isSmallScreen = useMediaQuery<BackstageTheme>(
    theme => theme.breakpoints.down('md'),
    { noSsr: true },
  );

  if (isSmallScreen) {
    return null;
  }

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Button
        role="button"
        onClick={handleClick}
        className={classes.expandButton}
        aria-label="Expand Sidebar"
        data-testid="sidebar-expand-button"
      >

          <div className={classes.circuloarrow}>
            <Box className={classes.arrows}>
              {isOpen ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
            </Box>
          </div>
      </Button>

    </>
  );
};
