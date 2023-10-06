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
  BackstageIdentityResponse,
  configApiRef,
  SignInPageProps,
  useApi,
} from '@backstage/core-plugin-api';
import { UserIdentity } from './UserIdentity';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useMountEffect } from '@react-hookz/web';
import { Progress } from '../../components/Progress';
import { Content } from '../Content/Content';
import { ContentHeader } from '../ContentHeader/ContentHeader';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Page } from '../Page';
import { getSignInProviders, useSignInProviders } from './providers';
import { GridItem, useStyles } from './styles';
import { IdentityProviders, SignInProviderConfig } from './types';
import LoginBackground from '../../../../app/src/assets/images/Login-Background.png';
import NeorisLogo from '../../../../app/src/assets/images/neoris-graphic-logo.png';
import { SidebarDivider } from '../Sidebar';

type MultiSignInPageProps = SignInPageProps & {
  providers: IdentityProviders;
  title?: string;
  align?: 'center' | 'left';
};

type SingleSignInPageProps = SignInPageProps & {
  provider: SignInProviderConfig;
  auto?: boolean;
};

export type Props = MultiSignInPageProps | SingleSignInPageProps;

export const MultiSignInPage = ({
  onSignInSuccess,
  providers = [],
  title,
  align = 'left',
}: MultiSignInPageProps) => {
  const configApi = useApi(configApiRef);
  const classes = useStyles();

  const signInProviders = getSignInProviders(providers);
  const [loading, providerElements] = useSignInProviders(
    signInProviders,
    onSignInSuccess,
  );

  if (loading) {
    return <Progress />;
  }

  return (
    <Page themeId="home">
      <Header title={configApi.getString('app.title')} />multi
      <Content>
        {title && <ContentHeader title={title} textAlign={align} />}
        <Grid
          container
          justifyContent={align === 'center' ? align : 'flex-start'}
          spacing={2}
          component="ul"
          classes={classes}
        >
          {providerElements}
        </Grid>
      </Content>
    </Page>
  );
};

export const SingleSignInPage = ({
  provider,
  auto,
  onSignInSuccess,
}: SingleSignInPageProps) => {
  const classes = useStyles();
  const authApi = useApi(provider.apiRef);
  const configApi = useApi(configApiRef);

  const [error, setError] = useState<Error>();

  // The SignIn component takes some time to decide whether the user is logged-in or not.
  // showLoginPage is used to prevent a glitch-like experience where the sign-in page is
  // displayed for a split second when the user is already logged-in.
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);

  type LoginOpts = { checkExisting?: boolean; showPopup?: boolean };
  const login = async ({ checkExisting, showPopup }: LoginOpts) => {
    try {
      let identityResponse: BackstageIdentityResponse | undefined;
      if (checkExisting) {
        // Do an initial check if any logged-in session exists
        identityResponse = await authApi.getBackstageIdentity({
          optional: true,
        });
      }

      // If no session exists, show the sign-in page
      if (!identityResponse && (showPopup || auto)) {
        // Unless auto is set to true, this step should not happen.
        // When user intentionally clicks the Sign In button, autoShowPopup is set to true
        setShowLoginPage(true);
        identityResponse = await authApi.getBackstageIdentity({
          instantPopup: true,
        });
        if (!identityResponse) {
          throw new Error(
            `The ${provider.title} provider is not configured to support sign-in`,
          );
        }
      }

      if (!identityResponse) {
        setShowLoginPage(true);
        return;
      }

      const profile = await authApi.getProfile();
      onSignInSuccess(
        UserIdentity.create({
          identity: identityResponse.identity,
          authApi,
          profile,
        }),
      );
    } catch (err: any) {
      // User closed the sign-in modal
      setError(err);
      setShowLoginPage(true);
    }
  };

  useMountEffect(() => login({ checkExisting: true }));

  const backgroundImageUrl = LoginBackground;
  const neorisLogo = NeorisLogo;

  // Single Sign in Page
  return (
    <div style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      {/* // <div style={{ background: 'url("/static/media/Incibe-Background.png")' }}> */}
      {showLoginPage ? (
        <Page themeId="home">
          {/* <Header title={configApi.getString('app.title')}/> */}
          <Content>
            <Grid
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              container
              justifyContent="center"
              alignItems="center"
              component="ul"
              classes={classes}
            >
              <GridItem>
                <InfoCard
                  variant="fullHeight"
                  actions={
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        login({ showPopup: true });
                      }}
                      style={{ display: 'block', margin: 'auto', marginBottom: '20px'}}
                    >
                      Sign In
                    </Button>
                  }
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img
                      src={neorisLogo}
                      alt="Logo"
                      width="70"
                      height="59.08"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                  <Typography variant="h6" align="left" gutterBottom style={{ marginLeft: '15px' }}>
                    {provider.title}
                  </Typography>
                  <SidebarDivider />
                  <Typography variant="body1" align="left" style={{ marginLeft: '15px' }}>
                    {provider.message}
                  </Typography>
                  {error && error.name !== 'PopupRejectedError' && (
                    <Typography variant="body1" color="error" align="center">
                      {error.message}
                    </Typography>
                  )}
                </InfoCard>
              </GridItem>
            </Grid>
          </Content>
        </Page>
      ) : (
        <Progress />
      )}
    </div>
  );
};

export function SignInPage(props: Props) {
  if ('provider' in props) {
    return <SingleSignInPage {...props} />;
  }

  return <MultiSignInPage {...props} />;
}
