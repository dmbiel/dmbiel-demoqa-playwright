import { test } from '@playwright/test';

import { SelectMenuPage } from '../../../src/pages/select-menu.page';

test.describe('Select Menu', () => {
  test('selects grouped and single values in react-based selects', async ({
    page,
  }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();
    await selectMenuPage.selectValue('Group 2, option 1');
    await selectMenuPage.expectSelectedValue('Group 2, option 1');

    await selectMenuPage.selectOneColor('Mr.');
    await selectMenuPage.expectSelectedOneColor('Mr.');
  });

  test('selects multiple colors and standard multi-select values', async ({
    page,
  }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();
    await selectMenuPage.selectMultipleColors(['Green', 'Blue', 'Black']);
    await selectMenuPage.expectSelectedMultipleColors([
      'Green',
      'Blue',
      'Black',
    ]);

    await selectMenuPage.selectCars(['volvo', 'audi']);
    await selectMenuPage.expectSelectedCars(['volvo', 'audi']);
  });

  test('changes the old style select menu value', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);

    await selectMenuPage.goto();
    await selectMenuPage.selectOldStyleColor('Magenta');
    await selectMenuPage.expectSelectedOldStyleColor('Magenta');
  });
});
