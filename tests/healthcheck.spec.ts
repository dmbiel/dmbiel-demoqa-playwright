import { expect, test } from '@playwright/test';

import {
  expectDemoQaHomePageReady,
  expectDemoQaSectionLandingReady,
  openDemoQaPage,
} from '../src/utils/demoqa-ui';

test.describe('Healthcheck', () => {
  test('homepage loads with expected shell and category cards', async ({
    page,
  }) => {
    await openDemoQaPage(page, '/');
    await expectDemoQaHomePageReady(page);

    await expect(page).toHaveTitle(/demosite/i);

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
    await expectDemoQaHomePageReady(page);

    await page.getByText('Elements', { exact: true }).click();

    await expect(page).toHaveURL(/\/elements$/);
    await expectDemoQaSectionLandingReady(page, {
      sectionName: 'Elements',
      primaryControls: [page.getByText('Text Box', { exact: true })],
    });
  });
});
