import { test } from '@playwright/test';

import { CheckBoxPage } from '../../../src/pages/check-box.page';

test.describe('Check Box', () => {
  test('selects the full Home tree and shows the complete summary', async ({
    page,
  }) => {
    const checkBoxPage = new CheckBoxPage(page);

    await checkBoxPage.goto();
    await checkBoxPage.selectHome();
    await checkBoxPage.expectHomeSelectionSummary();
  });

  test('expands the tree and selects only the Downloads branch', async ({
    page,
  }) => {
    const checkBoxPage = new CheckBoxPage(page);

    await checkBoxPage.goto();
    await checkBoxPage.expandAll();
    await checkBoxPage.selectDownloads();
    await checkBoxPage.expectDownloadsSelectionSummary();
  });
});
