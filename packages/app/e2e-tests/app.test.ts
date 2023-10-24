import { test, expect } from '@playwright/test';

//01_Open the app and click on the enter button
test('App should render the welcome page', async ({ page }) => {
  await page.goto('/');

  const enterButton = page.getByRole('button', { name: 'Enter' });
  await expect(enterButton).toBeVisible();
  await enterButton.click();

  await expect(page.getByText('Neoris Catalog')).toBeVisible();

  const supportButton = page.getByTestId('support-button');
  await expect(supportButton).toBeVisible();
  await supportButton.click();
});

//02_Open the app and go to APIs	
test('App should use the filter to API', async ({ page }) => {
  await page.goto('/');

  const enterButton = page.getByRole('button', { name: 'Enter' });
  await expect(enterButton).toBeVisible();
  await enterButton.click();

  const filterButton = page.getByRole('button', { name: 'Control Panel' });
  await expect(filterButton).toBeVisible();
  await filterButton.click();

  const APIButton = page.getByText('APIs');
  await expect(APIButton).toBeVisible();
  await APIButton.click();

  const APITitle = page.getByText('All apis');
  await expect(APITitle).toBeVisible();
});

//03_Open the app and go to first element in catalog
test('App should go to first element in catalog', async ({ page }) => {
  await page.goto('/');

  const enterButton = page.getByRole('button', { name: 'Enter' });
  await expect(enterButton).toBeVisible();
  await enterButton.click();

  const firstElement = page.locator('//a[@href="/catalog/default/component/dso-iac"]');
  await expect(firstElement).toBeVisible();
  await firstElement.click();

  const APIButton = page.getByText('About');
  await expect(APIButton).toBeVisible();
});

//04_Open the app and go to add component
test('App should go to the page to add a new component', async ({ page }) => {
  await page.goto('/');

  const enterButton = page.getByRole('button', { name: 'Enter' });
  await expect(enterButton).toBeVisible();
  await enterButton.click();


  const AddButton = page.getByRole('button', { name: 'Create' });
  await expect(AddButton).toBeVisible();
  await AddButton.click();

  const AddComponentText = page.getByText('Create a new component');
  await expect(AddComponentText).toBeVisible();
});