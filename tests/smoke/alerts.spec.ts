import { expect, test } from '@playwright/test';

import { AlertsPage } from '../../src/pages/alerts.page';

test.describe('Smoke alerts', () => {
  test('accepts a standard browser alert', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.goto();

    await expect(await alertsPage.triggerImmediateAlert()).toBe(
      'You clicked a button',
    );
  });
});
