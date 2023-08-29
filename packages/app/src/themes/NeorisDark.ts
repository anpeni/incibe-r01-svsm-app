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

const aoundImageUrl = require('../assets/Incibe-Background.png');
const bgColor = 'linear-gradient(90deg, rgba(6,11,40,0.75) 50%, rgba(6,11,40,0.7) 100%)';

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
        dark: '#DE350B',
      },
      warning: {
        main: '#FFAB00',
        light: '#FFE380',
        dark: '#FF8B00',
      },
      success: {
        main: '#36B37E',
        light: '#79F2C0',
        dark: '#006644',
      },
      info: {
        main: '#0065FF',
        light: '#4C9AFF',
        dark: '#0747A6',
      },
      background: {
        default: bgColor, // General
        paper: 'rgba(6, 11, 40, 0.5)' // Tarjetas
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
        fontFamily: "Inter, sans-serif",
        fontWeight: "bold",
      },
      subtitle: {
        color: theme.page.fontColor,
      },
      type: {
        color: alpha(theme.page.fontColor, 0.8),
      },
    },
    MuiTab: {
      textColorInherit: {
        color: theme.page.fontColor,
        opacity: 0.8,
      }
    },
    BackstageSidebar: {
      drawer: {
        // backgroundImage: `url(${backgroundImageUrl})`,
        borderRadius: '12px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        background: bgColor
      }
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
        '&> :first-child': {
          borderBottom: '1px solid #D5D5D5',
          boxShadow: 'none',
        },
        '& th': {
          borderTop: 'none',
          textTransform: 'none !important',
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
    MuiAutocomplete: {
      root: {
        '&[aria-expanded=true]': {
          backgroundColor: '#26385A',
          color: theme.page.fontColor,
        },
        '&[aria-expanded=true] path': {
          fill: theme.page.fontColor,
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(9,30,69,0.54)',
      },
    },
    MuiButton: {
      root: {
        borderRadius: "12px",
        textTransform: 'none',
        color: theme.page.fontColor,
        TextSize: "13px"
      },
      label: {
        justifyContent: "none",
      },
      contained: {
        fontFamily: "Inter, sans-serif",
        fontWeight: 600, // Semibold
        background: bgColor,
        // boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '&:hover': {
          background: "linear-gradient(90deg, rgba(6,11,40,0.35) 50%, rgba(6,11,40,0.3) 100%) !important",
        },
      },
    },
    MuiButtonBase: {
      root: {
        color: "white !important",
      }
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
        '&[aria-expanded]': { // Select abierto
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
    MuiTabs: {
      indicator: {
        transition: 'none',
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
        color: theme.page.fontColor,
        background: bgColor,
        fontWeight: 100, // Thin
      }
    },
    MuiFormLabel: {
      root: {
        color: theme.page.fontColor,
      }
    },
    MuiStepLabel: {
      label: {
        color: theme.page.fontColor,
        fontWeight: 100, // Thin
      }
    },
    MuiFormHelperText: {
      root: {
        color: theme.page.fontColor,
      }
    },
  };
};

export const neorisDarkTheme: UnifiedTheme = createUnifiedThemeFromV4({
  ...baseTheme,
  overrides: {
    ...baseTheme.overrides,
    ...createCustomThemeOverrides(baseTheme),
  },
});