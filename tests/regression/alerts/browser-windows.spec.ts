import { test } from '@playwright/test';

import { BrowserWindowsPage } from '../../../src/pages/browser-windows.page';

test.describe('Browser Windows', () => {
  test('opens the sample page in a new tab', async ({ page }) => {
    const browserWindowsPage = new BrowserWindowsPage(page);

    await browserWindowsPage.goto();

    const popup = await browserWindowsPage.openNewTab();
    await browserWindowsPage.expectSamplePageOpened(popup);
    await popup.close();
  });

  test('opens the sample page in a new window', async ({ page }) => {
    const browserWindowsPage = new BrowserWindowsPage(page);

    await browserWindowsPage.goto();

    const popup = await browserWindowsPage.openNewWindow();
    await browserWindowsPage.expectSamplePageOpened(popup);
    await popup.close();
  });

  test('opens the message-only window', async ({ page }) => {
    const browserWindowsPage = new BrowserWindowsPage(page);

    await browserWindowsPage.goto();

    const popup = await browserWindowsPage.openNewWindowMessage();
    await browserWindowsPage.expectMessageWindowOpened(popup);
    await popup.close();
  });
});
