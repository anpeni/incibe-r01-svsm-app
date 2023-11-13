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
} from '@backstage/theme';

import { alpha, Theme } from '@material-ui/core/styles';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';
import { AlertClassKey } from '@material-ui/lab/Alert';
import { vars } from './variables';

export interface CustomUnifiedTheme extends UnifiedTheme {
  overrides?: Theme['overrides'];
}

// Labs types not included in overrides; https://github.com/mui/material-ui/issues/19427
declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiAlert: AlertClassKey;
    MuiAutocomplete: AutocompleteClassKey;
  }
}

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
      ...palettes.dark,
      primary: {
        main: '#FFFFFF',
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
        default: vars.dark.background.generic, // General
        paper: 'rgba(255,255,255,0)', // Tarjetas (invisible)
      },
      navigation: {
        ...palettes.dark.navigation,
        color: '#FFFFFF',
        indicator: '#2684FF',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#FFF',
      },
    },
  }),
  fontFamily: vars.fontFamily,
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
        fontFamily: vars.fontFamily,
        fontWeight: 'bold',
      },
      subtitle: {
        color: theme.page.fontColor,
      },
      type: {
        color: alpha(theme.page.fontColor, 0.8),
      },
    },
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
      },
      tabsWrapper: {
        backgroundColor: 'none',
      },
      selected: {
        //backgroundColor: 'red',
        //borderRadius: '12px',
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
    MuiTable: {
      root: {
        '& th': {
          // ? Cabecera
          background: vars.dark.background.highlight,
          border: 'none',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      root: {
        background: 'none',
        '&:nth-of-type(even)': {
          background: vars.dark.table.evenRows, // Filas pares tabla
        },
      },
      head: {
        color: '#FFFFFF',
        fontFamily: vars.fontFamily,
        fontSize: '13px',
        fontWeight: 'bold',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '12px',
      },
      elevation2: {
        boxShadow: 'none',
      },
      elevation8: {
        boxShadow: 'none',
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
      listbox: {
        // ? Select con varias opciones desplegado
        background: vars.dark.background.card,
        borderRadius: '12px',
      },
    },
    // ? Modificar select con varias opciones (caja)
    MuiOutlinedInput: {
      root: {
        borderRadius: '12px',
        background: vars.dark.background.card,
      },
      notchedOutline: {
        border: 'none',
      },
      // input: {
      //   '&:-webkit-autofill': {
      //     caretColor: 'red !important',
      //     borderRadius: '12px',
      //     '-webkitBoxShadow': '0 0 0 100px #fff inset',
      //     '-webkitTextFillColor': 'black !important',
      //   },
      // },
    },
    MuiButton: {
      root: {
        borderRadius: '12px',
        textTransform: 'none',
        TextSize: '13px',
        '&:hover': {
          backgroundColor: 'none !important',
        },
      },
      // ? Botones login
      outlinedPrimary: {
        border: 'none',
        backgroundColor: vars.dark.background.highlight,
        '&:hover': {
          backgroundColor: vars.dark.background.highlight,
          opacity: '0.5',
          border: 'none',
        },
      },
      // ? Boton Add Catalog
      containedPrimary: {
        backgroundColor: vars.dark.background.highlight,
        color: vars.dark.fontColor.white,
      },
      // ? Ajustar Control panel en Sidebar
      label: {
        justifyContent: 'none',
        //color: 'white',
      },
      // ? Botones genericos
      contained: {
        fontFamily: vars.fontFamily,
        fontWeight: 600, // Semibold
        '&:hover': {
          backgroundColor: vars.dark.background.highlight,
          opacity: 0.5,
        },
      },
    },
    // ? Tabs
    MuiTabs: {
      indicator: {
        background: '#4FD1C5',
        height: '6px',
        borderRadius: '12px',
      },
    },
    MuiInput: {
      // ? Filtro
      root: {
        width: '281px',
        height: '42px',
      },
      underline: {
        '&::before': {
          borderBottom: 'none !important',
        },
        '&::after': {
          borderBottom: 'none !important',
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        position: 'relative',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#000',
        fontSize: '24px',
        fontStyle: 'normal',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        lineHeight: '16px',
      },
    },
    // ? Icono Filter
    MuiInputAdornment: {
      positionStart: {
        paddingLeft: '12px',
      },
    },
    // ? Sidebar

    // ? Cards genericas de MUi
    MuiCard: {
      root: {
        background: vars.dark.background.generic,
        backdropFilter: 'blur(120px)',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.70)',
      },
    },
    // ? Quitar borde bajo a lista de botones
    MuiListItem: {
      divider: {
        borderBottom: '0px',
      },
    },
    // ? Color fondo Sidebar
    BackstageSidebar: {
      drawer: {
        backgroundColor: vars.dark.background.generic,
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
      subtitle2: {
        // ? Sidebar Items
        fontSize: '16px', //16px
        fontFamily: vars.fontFamily, //inter
        // fontWeight: '500',//regular
        lineHeight: '1.57',
      },
    },
  };
};

export const neorisDarkTheme: CustomUnifiedTheme = createUnifiedThemeFromV4({
  ...baseTheme,
  overrides: {
    ...baseTheme.overrides,
    ...createCustomThemeOverrides(baseTheme),
  },
});
