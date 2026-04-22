import { test } from '@playwright/test';

import { BrowserWindowsPage } from '../../src/pages/browser-windows.page';

test.describe('Smoke browser windows', () => {
  test('opens the sample page in a new tab', async ({ page }) => {
    const browserWindowsPage = new BrowserWindowsPage(page);

    await browserWindowsPage.goto();

    const popup = await browserWindowsPage.openNewTab();
    await browserWindowsPage.expectSamplePageOpened(popup);
    await popup.close();
  });
});
