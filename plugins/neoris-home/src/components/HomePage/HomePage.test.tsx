import React from 'react';
import { renderWithEffects, wrapInTestApp } from '@backstage/test-utils';
import { HomePage } from './HomePage';
import { UserHomeTab } from '../UserHomeTab';
import { useOutlet } from 'react-router-dom';
import { HomeLayout } from '../HomeLayout';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutlet: jest.fn().mockReturnValue(undefined),
}));

describe('<SettingsPage />', () => {
  beforeEach(() => {
    (useOutlet as jest.Mock).mockReset();
  });

  it('should render the default settings page with 3 tabs', async () => {
    const { container } = await renderWithEffects(
      wrapInTestApp(<HomePage />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(3);
  });

  it('should render the default settings page with 4 tabs when extra tabs are provided via UserSettingsTab', async () => {
    const advancedTabRoute = (
      <UserHomeTab path="/advanced" title="Advanced">
        <div>Advanced settings</div>
      </UserHomeTab>
    );
    (useOutlet as jest.Mock).mockReturnValue(advancedTabRoute);
    const { container } = await renderWithEffects(
      wrapInTestApp(<HomePage />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(4);
    expect(tabs[3].textContent).toEqual('Advanced');
  });

  it('should render the default settings page with 4 tabs when extra tabs are provided via SettingsLayout.Route', async () => {
    const advancedTabRoute = (
      <HomeLayout.Route path="/advanced" title="Advanced">
        <div>Advanced settings</div>
      </HomeLayout.Route>
    );
    (useOutlet as jest.Mock).mockReturnValue(advancedTabRoute);
    const { container } = await renderWithEffects(
      wrapInTestApp(<HomePage />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(4);
    expect(tabs[3].textContent).toEqual('Advanced');
    const user = userEvent.setup();
    await user.click(screen.getByText(/Advanced/i));
    const content = container.querySelectorAll('article');
    expect(content[0].textContent).toEqual('Advanced settings');
  });

  it('should render the custom settings page when custom layout is provided', async () => {
    const customLayout = (
      <HomeLayout>
        <HomeLayout.Route path="general" title="General">
          <div>User settings</div>
        </HomeLayout.Route>
        <HomeLayout.Route path="advanced" title="Advanced">
          <div>Advanced settings</div>
        </HomeLayout.Route>
      </HomeLayout>
    );
    (useOutlet as jest.Mock).mockReturnValue(customLayout);
    const { container } = await renderWithEffects(
      wrapInTestApp(<HomePage />),
    );

    const tabs = container.querySelectorAll('[class*=MuiTabs-root] button');
    expect(tabs).toHaveLength(2);
    expect(tabs[0].textContent).toEqual('General');
    expect(tabs[1].textContent).toEqual('Advanced');
    const user = userEvent.setup();
    await user.click(screen.getByText(/Advanced/i));
    const content = container.querySelectorAll('article');
    expect(content[0].textContent).toEqual('Advanced settings');
  });
});

