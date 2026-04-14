import { test } from '@playwright/test';

import { CheckBoxPage } from '../../src/pages/check-box.page';

test.describe('Smoke check box', () => {
  test('selects the Home node and shows the selection summary', async ({
    page,
  }) => {
    const checkBoxPage = new CheckBoxPage(page);

    await checkBoxPage.goto();
    await checkBoxPage.selectHome();
    await checkBoxPage.expectHomeSelectionSummary();
  });
});
