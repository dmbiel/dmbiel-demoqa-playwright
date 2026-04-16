import { test } from '@playwright/test';

import { SelectMenuPage } from '../../src/pages/select-menu.page';

test.describe('Smoke select menu', () => {
  test('selects values in the main select menu widgets', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();
    await selectMenuPage.selectValue('Group 1, option 2');
    await selectMenuPage.expectSelectedValue('Group 1, option 2');

    await selectMenuPage.selectOldStyleColor('Purple');
    await selectMenuPage.expectSelectedOldStyleColor('Purple');

    await selectMenuPage.selectCars(['saab', 'audi']);
    await selectMenuPage.expectSelectedCars(['saab', 'audi']);
  });
});
