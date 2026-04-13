import { expect, test } from '@playwright/test';

import { openDemoQaPage } from '../src/utils/demoqa-ui';

test.describe('Healthcheck', () => {
  test('homepage loads with expected shell and category cards', async ({
    page,
  }) => {
    await openDemoQaPage(page, '/');

    await expect(page).toHaveTitle(/demosite/i);
    await expect(page.locator('header a img')).toBeVisible();

    const categories = [
      'Elements',
      'Forms',
      'Alerts, Frame & Windows',
      'Widgets',
      'Interactions',
      'Book Store Application',
    ];

    for (const category of categories) {
      await expect(page.getByText(category, { exact: true })).toBeVisible();
    }
  });

  test('homepage navigation opens the Elements section', async ({ page }) => {
    await openDemoQaPage(page, '/');

    await page.getByText('Elements', { exact: true }).click();

    await expect(page).toHaveURL(/\/elements$/);
    await expect(
      page.getByText('Please select an item from left to start practice.'),
    ).toBeVisible();
    await expect(page.getByText('Text Box', { exact: true })).toBeVisible();
  });
});
