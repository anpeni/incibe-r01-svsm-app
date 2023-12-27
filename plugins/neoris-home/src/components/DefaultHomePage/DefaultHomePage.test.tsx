import React from 'react';
import { renderWithEffects, wrapInTestApp } from '@backstage/test-utils';
import { DefaultHomePage } from './DefaultHomePage';
import { UserHomeTab } from '../UserHomeTab';
import { useOutlet } from 'react-router-dom';
import { HomeLayout } from '../HomeLayout';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutlet: jest.fn().mockReturnValue(undefined),
}));

describe('<DefaultHomePage />', () => {
  beforeEach(() => {
    (useOutlet as jest.Mock).mockReset();
  });

  it('should render the settings page with 3 tabs', async () => {
    const { container } = await renderWithEffects(
      wrapInTestApp(<DefaultHomePage />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(3);
  });

  it('should render the settings page with 4 tabs when extra tabs are provided via UserSettingsTab', async () => {
    const advancedTabRoute = (
      <UserHomeTab path="/advanced" title="Advanced">
        <div>Advanced Home</div>
      </UserHomeTab>
    );
    const { container } = await renderWithEffects(
      wrapInTestApp(<DefaultHomePage tabs={[advancedTabRoute]} />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(4);
    expect(tabs[3].textContent).toEqual('Advanced');
  });

  it('should render the settings page with 4 tabs when extra tabs are provided via SettingsLayout.Route', async () => {
    const advancedTabRoute = (
      <HomeLayout.Route path="/advanced" title="Advanced">
        <div>Advanced settings</div>
      </HomeLayout.Route>
    );
    const { container } = await renderWithEffects(
      wrapInTestApp(<DefaultHomePage tabs={[advancedTabRoute]} />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(4);
    expect(tabs[3].textContent).toEqual('Advanced');
  });
});

