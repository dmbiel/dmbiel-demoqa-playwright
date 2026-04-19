import { test } from '@playwright/test';

import { TabsPage } from '../../../src/pages/tabs.page';

test.describe('Tabs', () => {
  test('switches between available tabs and shows the expected content', async ({
    page,
  }) => {
    const tabsPage = new TabsPage(page);

    await tabsPage.goto();
    await tabsPage.expectWhatTabVisible();

    await tabsPage.openOriginTab();
    await tabsPage.expectOriginTabVisible();

    await tabsPage.openUseTab();
    await tabsPage.expectUseTabVisible();
  });

  test('keeps the disabled More tab unavailable', async ({ page }) => {
    const tabsPage = new TabsPage(page);

    await tabsPage.goto();
    await tabsPage.expectWhatTabVisible();
    await tabsPage.expectMoreTabDisabled();
    await tabsPage.tryToOpenMoreTab();
    await tabsPage.expectWhatTabStillVisible();
  });
});
