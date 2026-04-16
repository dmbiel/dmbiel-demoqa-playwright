import { test } from '@playwright/test';

import { TabsPage } from '../../src/pages/tabs.page';

test.describe('Smoke tabs', () => {
  test('switches between available widget tabs', async ({ page }) => {
    const tabsPage = new TabsPage(page);

    await tabsPage.goto();
    await tabsPage.expectWhatTabVisible();

    await tabsPage.openOriginTab();
    await tabsPage.expectOriginTabVisible();

    await tabsPage.openUseTab();
    await tabsPage.expectUseTabVisible();
  });
});
