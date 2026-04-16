import { test } from '@playwright/test';

import { RadioButtonPage } from '../../src/pages/radio-button.page';

test.describe('Smoke radio button', () => {
  test('selects Yes and Impressive, and keeps No disabled', async ({
    page,
  }) => {
    const radioButtonPage = new RadioButtonPage(page);

    await radioButtonPage.goto();
    await radioButtonPage.selectYes();
    await radioButtonPage.expectSelectedValue('Yes');

    await radioButtonPage.selectImpressive();
    await radioButtonPage.expectSelectedValue('Impressive');
    await radioButtonPage.expectNoOptionDisabled();
  });
});
