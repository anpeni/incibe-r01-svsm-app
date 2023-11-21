import React from 'react';
import { Route } from 'react-router';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import-modificado';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis, dexOIDCAuthApiRef } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { PermissionedRoute } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

// .--  Custom Theme --
import CssBaseline from '@material-ui/core/CssBaseline';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';

// .--  Custom icons --
import { BitbucketIcon } from './assets/bitbucket';

// .-- home page --

// .-- Plugins --
import * as plugins from './plugins';

// .-- Theme Override --
import { UnifiedThemeProvider } from '@backstage/theme';
import { neorisDarkTheme } from './themes/NeorisDark';
import { neorisLightTheme } from './themes/NeorisLight';

import { FluxRuntimePage } from '@weaveworksoss/backstage-plugin-flux';

const isProduction = process.env.NODE_ENV === 'production';
const app = createApp({
  apis,
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        {...(!isProduction
          ? {
              providers: [
                'guest',
                {
                  id: 'dex',
                  title: 'Dex',
                  message: 'Sign in using Azure AD',
                  apiRef: dexOIDCAuthApiRef,
                },
              ],
            }
          : {
              provider: {
                id: 'dex',
                title: 'Dex',
                message: 'Sign in using Azure AD',
                apiRef: dexOIDCAuthApiRef,
              },
            })}
      />
  ),




  },
  // .--  pliugins --
  plugins: Object.values(plugins),
  // .-- icons --
  icons: {
    bitbucket: BitbucketIcon,
  },
  // .-- themes --
  themes: [
    //   {
    //   id: 'neoris-theme',
    //   title: 'Neoris Theme',
    //   variant: 'light',
    //   icon: <LightIcon />,
    //   Provider: ({ children }) => (
    //     <ThemeProvider theme={NeorisTheme}>
    //       <CssBaseline>{children}</CssBaseline>
    //     </ThemeProvider>
    //   ),
    // },
    // {
    //   id: 'light',
    //   title: 'Light',
    //   variant: 'light',
    //   Provider: ({ children }) => (
    //     <UnifiedThemeProvider theme={themes.light} children={children} />
    //   ),
    // },
    // {
    //   id: 'dark',
    //   title: 'Dark',
    //   variant: 'dark',
    //   Provider: ({ children }) => (
    //     <UnifiedThemeProvider theme={themes.dark} children={children} />
    //   ),
    // },
    {
      id: 'neoris-dark',
      title: 'Dark mode',
      variant: 'dark',
      icon: <DarkIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={neorisDarkTheme} noCssBaseline>
          <CssBaseline />
          {children}
        </UnifiedThemeProvider>
      ),
    },
    {
      id: 'neoris-light',
      title: 'Light mode',
      variant: 'light',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={neorisLightTheme} noCssBaseline>
          <CssBaseline />
          {children}
        </UnifiedThemeProvider>
      ),
    },
  ],
  // .-- routes bind --
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: catalogImportPlugin.routes.importPage, // Manda a Add
      // createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const routes = (
  <FlatRoutes>
    {/* <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route> */}
    <Route path="/" element={<CatalogIndexPage />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <PermissionedRoute
      path="/catalog-import"
      permission={catalogEntityCreatePermission}
      element={<CatalogImportPage />}
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/flux-runtime" element={<FluxRuntimePage/>} />
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default App;
