import { expect, test } from '@playwright/test';

import {
  expectDemoQaHomePageReady,
  expectDemoQaSectionLandingReady,
  openDemoQaPage,
} from '../../src/utils/demoqa-ui';

test.describe('Smoke navigation', () => {
  test('homepage card opens the Forms section', async ({ page }) => {
    await openDemoQaPage(page, '/');
    await expectDemoQaHomePageReady(page);

    await page.getByText('Forms', { exact: true }).click();

    await expect(page).toHaveURL(/\/forms$/);
    await expectDemoQaSectionLandingReady(page, {
      sectionName: 'Forms',
      primaryControls: [page.getByText('Practice Form', { exact: true })],
    });
  });

  test('homepage card opens the Alerts section', async ({ page }) => {
    await openDemoQaPage(page, '/');
    await expectDemoQaHomePageReady(page);

    await page.getByText('Alerts, Frame & Windows', { exact: true }).click();

    await expect(page).toHaveURL(/\/alertsWindows$/);
    await expectDemoQaSectionLandingReady(page, {
      sectionName: 'Alerts, Frame & Windows',
      primaryControls: [page.getByText('Alerts', { exact: true })],
    });
  });
});
