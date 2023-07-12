import { BackstageOverrides } from '@backstage/core-components';

import { BackstageOverrides as CatalogReactOverrides } from '@backstage/plugin-catalog-react';

import { BackstageTheme, createTheme, lightTheme } from '@backstage/theme';




import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';

import { AlertClassKey } from '@material-ui/lab/Alert';




/*import SegoeuiTff from './fonts/Segoeui.ttf';

import SegoeuiBoldTff from './fonts/Segoeui-Bold.ttf';

import SegoeuiSemiBoldTff from './fonts/Segoeui-SemiBold.ttf';

import SegoeuiLightTff from './fonts/Segoeui-Light.ttf';

import SegoeuiSemiLightTff from './fonts/Segoeui-SemiLight.ttf';*/




const white = "#FFFFFF";

const black = "#1B242A";

const grey = "#1E242B";

const blue = "#89D2E6";  

const blueDark = "#00B0F0";

const blueDark06 = "rgba(0,176,240,0.6)";

const yellow = "#F6CE3C";

const yellow06 = "rgba(246,206,60,0.6)";

const green = "#009D4E";

const purple = "#EF3FA9";

const purpleLight = "#F294CD";




// Labs types not included in overrides; https://github.com/mui/material-ui/issues/19427

declare module '@material-ui/core/styles/overrides' {

  export interface ComponentNameToClassKey {

    MuiAlert: AlertClassKey;

    MuiAutocomplete: AutocompleteClassKey;

  }

}




const baseTheme = createTheme({

  palette: {

    ...lightTheme.palette,

    primary: {

      main: black, // '#0052CC',

      light: '#4C9AFF',

      dark: '#172B4D',

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

      800: '#172B4D',

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

    // navigation: {

    //   ...lightTheme.palette.navigation,

    //   background: grey , //'#172B4D',

    //   color: white,

    //   indicator: blueDark, //'#2684FF',

    //   navItem: {

    //     hoverBackground: blueDark06, // 'rgba(116,118,121,0.6)',

    //   },

    // },

    text: {

      primary: grey , //'#172B48',

    },

    background: {

      default: white,

    },

  },

  fontFamily: 'Roboto, sans-serif',

  defaultPageTheme: 'home',

});




const createCustomThemeOverrides = (

  theme: BackstageTheme,

): BackstageOverrides & CatalogReactOverrides => {

  return {

    BackstageHeader: {

      header: {

        backgroundImage: 'unset',

        boxShadow: 'unset',

        paddingBottom: theme.spacing(1),

      },

      title: {

        color: theme.palette.primary.dark,

        fontWeight: 900,

      },

      subtitle: {

        color: theme.palette.primary.dark,

      },

      type: {

        color: theme.palette.primary.dark,

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

          fill: white,

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

        color: white,

        backgroundColor: theme.palette.error.dark,

        '& $icon': {

          color: white,

        },

      },

      standardInfo: {

        color: white,

        backgroundColor: theme.palette.primary.dark,

        '& $icon': {

          color: white,

        },

      },

      standardSuccess: {

        color: white,

        backgroundColor: theme.palette.success.dark,

        '& $icon': {

          color: white,

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

          color: white,

        },

        '&[aria-expanded=true] path': {

          fill: white,

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

        borderRadius: 3,

        textTransform: 'none',

      },

      contained: {

        boxShadow: 'none',

      },

    },

    MuiChip: {

      root: {

        borderRadius: 3,

        backgroundColor: theme.palette.grey[50],

        color: theme.palette.primary.dark,

        margin: 4,

      },

    },

    MuiSelect: {

      root: {

        '&[aria-expanded]': {

          backgroundColor: '#26385A',

          color: white,

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

        backgroundColor: white,

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

      button: {

        textTransform: 'none',

      },

    },

  };

};




export const NeorisTheme: BackstageTheme = {

  ...baseTheme,

  overrides: {

    ...baseTheme.overrides,

    ...createCustomThemeOverrides(baseTheme),

  },

};