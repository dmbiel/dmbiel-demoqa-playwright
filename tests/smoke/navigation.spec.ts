import { expect, test } from '@playwright/test';

import { openDemoQaPage } from '../../src/utils/demoqa-ui';

test.describe('Smoke navigation', () => {
  test('homepage card opens the Forms section', async ({ page }) => {
    await openDemoQaPage(page, '/');

    await page.getByText('Forms', { exact: true }).click();

    await expect(page).toHaveURL(/\/forms$/);
    await expect(
      page.getByText('Please select an item from left to start practice.'),
    ).toBeVisible();
    await expect(page.getByText('Practice Form', { exact: true })).toBeVisible();
  });

  test('homepage card opens the Alerts section', async ({ page }) => {
    await openDemoQaPage(page, '/');

    await page.getByText('Alerts, Frame & Windows', { exact: true }).click();

    await expect(page).toHaveURL(/\/alertsWindows$/);
    await expect(
      page.getByText('Please select an item from left to start practice.'),
    ).toBeVisible();
    await expect(page.getByText('Alerts', { exact: true })).toBeVisible();
  });
});
