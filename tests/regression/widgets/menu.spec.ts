import { test } from '@playwright/test';

import { MenuPage } from '../../../src/pages/menu.page';

test.describe('Menu', () => {
  test('reveals submenu levels only after the expected hover actions', async ({
    page,
  }) => {
    const menuPage = new MenuPage(page);

    await menuPage.goto();
    await menuPage.expectMainItemsVisible();
    await menuPage.expectSubMenuHidden();
    await menuPage.expectNestedItemsHidden();

    await menuPage.hoverMainItem2();
    await menuPage.expectSubMenuVisible();
    await menuPage.expectNestedItemsHidden();

    await menuPage.hoverSubSubList();
    await menuPage.expectNestedItemsVisible();
  });
});
