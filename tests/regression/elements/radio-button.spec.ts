import { test } from '@playwright/test';

import { RadioButtonPage } from '../../../src/pages/radio-button.page';

test.describe('Radio Button', () => {
  test('switches selection from Yes to Impressive', async ({ page }) => {
    const radioButtonPage = new RadioButtonPage(page);

    await radioButtonPage.goto();
    await radioButtonPage.expectNoSelectionResult();

    await radioButtonPage.selectYes();
    await radioButtonPage.expectSelectedValue('Yes');
    await radioButtonPage.expectYesChecked();

    await radioButtonPage.selectImpressive();
    await radioButtonPage.expectSelectedValue('Impressive');
    await radioButtonPage.expectImpressiveChecked();
    await radioButtonPage.expectYesNotChecked();
  });

  test('keeps the No option disabled', async ({ page }) => {
    const radioButtonPage = new RadioButtonPage(page);

    await radioButtonPage.goto();
    await radioButtonPage.expectNoOptionDisabled();
  });
});
