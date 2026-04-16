import { test } from '@playwright/test';

import { AutoCompletePage } from '../../src/pages/auto-complete.page';

test.describe('Smoke auto complete', () => {
  test('selects multiple and single colors', async ({ page }) => {
    const autoCompletePage = new AutoCompletePage(page);

    await autoCompletePage.goto();
    await autoCompletePage.selectMultipleColors(['Red', 'Green']);
    await autoCompletePage.expectMultipleColors(['Red', 'Green']);

    await autoCompletePage.selectSingleColor('Blue');
    await autoCompletePage.expectSingleColor('Blue');
  });
});
