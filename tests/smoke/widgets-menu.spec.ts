import { test } from '@playwright/test';

import { MenuPage } from '../../src/pages/menu.page';

test.describe('Smoke menu', () => {
  test('reveals submenu and nested submenu items on hover', async ({
    page,
  }) => {
    const menuPage = new MenuPage(page);

    await menuPage.goto();
    await menuPage.hoverMainItem2();
    await menuPage.expectSubMenuVisible();

    await menuPage.hoverSubSubList();
    await menuPage.expectNestedItemsVisible();
  });
});
