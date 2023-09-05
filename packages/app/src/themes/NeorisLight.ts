import { BackstageOverrides } from '@backstage/core-components';
import { BackstageOverrides as CatalogReactOverrides } from '@backstage/plugin-catalog-react';
import {
  createTheme,
  createUnifiedThemeFromV4,
  createBaseThemeOptions,
  pageTheme as defaultPageThemes,
  PageTheme,
  palettes,
  UnifiedTheme,
  BackstageTheme,
} from '@backstage/theme';

import { alpha, makeStyles, Theme } from '@material-ui/core/styles';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';
import { AlertClassKey } from '@material-ui/lab/Alert';

// Labs types not included in overrides; https://github.com/mui/material-ui/issues/19427
declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiAlert: AlertClassKey;
    MuiAutocomplete: AutocompleteClassKey;
  }
}

const ndImageUrl = require('../assets/Incibe-Background.png');
const bgColor =
  'linear-gradient(90deg, rgba(224,241,255,0.5) 50%, rgba(224,241,255,0.4) 100%)';

const pageThemesFontColorOverride: Record<string, PageTheme> = {};
Object.keys(defaultPageThemes).map(key => {
  pageThemesFontColorOverride[key] = {
    ...defaultPageThemes[key],
    fontColor: '#FFFFFF',
  };
});

// TODO(awanlin): Continuing to use the deprecated `createTheme` for now
// will come back to clean this up when we have a better solution for this

// eslint-disable-next-line
const baseTheme = createTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      primary: {
        main: '#0052CC',
        light: '#4C9AFF',
        dark: '#060B28B3',
      },
      secondary: {
        main: '#FF5630',
        light: '#FFAB00',
        dark: '#6554C0',
      },
      grey: {
        50: '#C1C7D0',
        100: '#7A869A',
        200: '#6B778C',
        300: '#5E6C84',
        400: '#505F79',
        500: '#42526E',
        600: '#344563',
        700: '#253858',
        800: '#060B28B3',
        900: '#091E42',
      },
      error: {
        main: '#FF5630',
        light: '#FF8F73',
      },
      warning: {
        main: '#FFAB00',
        light: '#FFE380',
      },
      success: {
        main: '#36B37E',
        light: '#79F2C0',
      },
      info: {
        main: '#0065FF',
        light: '#4C9AFF',
      },
      background: {
        default: bgColor, // General
        paper: 'rgba(224, 241, 255, 0.5)', // Tarjetas
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      navigation: {
        ...palettes.light.navigation,
        color: '#FFFFFF',
        indicator: '#2684FF',
        navItem: {
          hoverBackground: 'rgba(116,118,121,0.6)',
        },
      },
      text: {
        primary: '#FFFFFF',
      },
    },
  }),
  fontFamily: 'Inter, sans-serif',
  pageTheme: pageThemesFontColorOverride,
  defaultPageTheme: 'home',
});

const createCustomThemeOverrides = (
  theme: Theme,
): BackstageOverrides & CatalogReactOverrides => {
  return {
    BackstageHeader: {
      header: {
        backgroundImage: 'unset',
        boxShadow: 'unset',
        paddingBottom: theme.spacing(1),
      },
      title: {
        color: theme.page.fontColor,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
      subtitle: {
        color: theme.page.fontColor,
      },
      type: {
        color: alpha(theme.page.fontColor, 0.8),
      },
    },
    BackstageSidebar: {
      drawer: {
        // backgroundImage: `url(${backgroundImageUrl})`,
        borderRadius: '12px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        background: bgColor,
        backdropFilter: 'blur(120px)',
      },
    },
    // TODO: Remove after https://github.com/backstage/backstage/pull/16853 is available here
    BackstageHeaderLabel: {
      label: {
        color: theme.page.fontColor,
      },
      value: {
        color: alpha(theme.page.fontColor, 0.8),
      },
    },
    BackstageHeaderTabs: {
      defaultTab: {
        fontSize: 'inherit',
        textTransform: 'none',
        padding: '5px',
        // backgroundColor: 'rgba(224, 241, 255, 0.5)',
        color: '#E0F1FF',
      },
      tabsWrapper: {
        backgroundColor: 'none',
      },
      selected: {
        backgroundColor: 'white',
        color: '#333333',
        borderRadius: '12px',
        '&:hover': {
          color: '#333333 !important',
        },
      },
      tabRoot: {
        '&:hover': {
          color: 'white',
        },
      },
    },
    BackstageOpenedDropdown: {
      icon: {
        '& path': {
          fill: theme.page.fontColor,
        },
      },
    },
    BackstageTable: {
      root: {
        // background: bgColor,
        '&> :first-child': {
          borderBottom: '1px solid #D5D5D5',
          boxShadow: 'none',
        },
        '& th': {
          borderTop: 'none',
          // textTransform: 'none !important',
        },
      },
    },
    CatalogReactUserListPicker: {
      title: {
        textTransform: 'none',
      },
    },
    MuiAlert: {
      root: {
        borderRadius: 0,
      },
      standardError: {
        color: theme.page.fontColor,
        backgroundColor: theme.palette.error.dark,
        '& $icon': {
          color: theme.page.fontColor,
        },
      },
      standardInfo: {
        color: '#FFFFFF',
        backgroundColor: theme.palette.primary.dark,
        '& $icon': {
          color: '#FFFFFF',
        },
      },
      standardSuccess: {
        color: theme.page.fontColor,
        backgroundColor: theme.palette.success.dark,
        '& $icon': {
          color: theme.page.fontColor,
        },
      },
      standardWarning: {
        color: theme.palette.grey[700],
        backgroundColor: theme.palette.secondary.light,
        '& $icon': {
          color: theme.palette.grey[700],
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(9,30,69,0.54)',
      },
    },
    MuiAutocomplete: {
      tagSizeSmall: {
        // Tags en desplegables
        background:
          'var(--color-dark, linear-gradient(180deg, rgba(6, 11, 40, 0.75) 0%, rgba(6, 11, 40, 0.70) 100%))',
        borderRadius: '12px',
      },
      paper: {
        // Desplegables con varias opciones
        color: '#000000',
        background: '#FFFFFF',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '12px',
        textTransform: 'none',
        color: theme.page.fontColor,
        TextSize: '13px',
      },
      outlinedPrimary: {
        // Buttons on login page
        border: '1px solid #66BFDC',
        backgroundColor: 'rgba(224, 241, 255, 0.5)',
        color: '#FFFFFF',
        '&:hover': {
          background: 'rgba(6, 11, 40, 0.5) !important',
          border: 'none',
        },
      },
      label: {
        justifyContent: 'none',
        color: 'white',
      },
      contained: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600, // Semibold
        background: bgColor,
        '&:hover': {
          background:
            'linear-gradient(90deg, rgba(224,241,255,0.5) 50%, rgba(224,241,255,0.4) 100%) !important',
        },
      },
    },
    MuiChip: {
      root: {
        borderRadius: 3,
        backgroundColor: theme.palette.grey[50],
        color: theme.page.fontColor,
        margin: 4,
      },
    },
    MuiSelect: {
      root: {
        '&[aria-expanded]': {
          // Select abierto
          // backgroundColor: bgColor,
          // color: 'black',
        },
      },
    },
    MuiSwitch: {
      root: {
        padding: 10,
      },
      switchBase: {
        padding: 12,
      },
      thumb: {
        // backgroundColor: bgColor,
        height: 14,
        width: 14,
      },
      track: {
        borderRadius: 9,
      },
    },
    MuiTab: {
      textColorInherit: {
        color: theme.page.fontColor,
        opacity: 0.8,
      },
    },
    MuiTabs: {
      indicator: {
        transition: 'none',
        background: 'none',
      },
      scrollButtons: {
        borderRadius: '12px',
      },
      scrollable: {
        borderRadius: '12px',
        backgroundColor: 'rgba(224, 241, 255, 0.5)',
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: theme.page.fontColor,
      },
      colorTextSecondary: {
        color: theme.page.fontColor,
      },
      button: {
        textTransform: 'none',
      },
    },
    MuiInputBase: {
      root: {
        // Select and Filters
        color: theme.page.fontColor,
        background: bgColor,
        fontWeight: 100, // Thin
      },
    },
    MuiFormLabel: {
      root: {
        color: theme.page.fontColor,
      },
    },
    MuiStepLabel: {
      label: {
        color: theme.page.fontColor,
        fontWeight: 100, // Thin
      },
    },
    MuiFormHelperText: {
      root: {
        color: theme.page.fontColor,
      },
    },
    // BackstageSidebarDivider: {
    //   root: {
    //     background: 'white',
    //     opacity: 0.3,
    //     width: '10px',
    //   },
    // },
    // News In Light Themewh
    MuiTable: {
      root: {
        backdropFilter: 'blur(120px)',
      },
    },
    MuiTableRow: {
      root: {
        // background: 'blue',
        borderRadius: '12px',
      },
    },
    MuiMenu: {
      // Desplegables
      list: {
        background: '#FFFFFF',
        color: '#000000',
      },
    },
    MuiOutlinedInput: {
      // Casilla del desplegable
      root: {
        background: '#FFFFFF',
      },
    },
    BackstageSelectInputBase: {
      input: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        '&:focus': {
          background: '#FFFFFF', // Cambia el fondo a blanco cuando está enfocado
        },
      },
    },
    MuiListItem: {
      container: {
        // background: '#FFFFFF',
        color: '#000000',
      },
    },
    BackstageInfoCard: {
      header: {
        backdropFilter: 'blur(120px)',
      },
    },
    MuiCard: {
      root: {
        backdropFilter: 'blur(120px)',
      },
    },
  };
};

export const neorisLightTheme: UnifiedTheme = createUnifiedThemeFromV4({
  ...baseTheme,
  overrides: {
    ...baseTheme.overrides,
    ...createCustomThemeOverrides(baseTheme),
  },
});
