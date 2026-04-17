import { test } from '@playwright/test';

import { AutoCompletePage } from '../../../src/pages/auto-complete.page';

test.describe('Auto Complete', () => {
  test('adds and removes multiple selected colors', async ({ page }) => {
    const autoCompletePage = new AutoCompletePage(page);

    await autoCompletePage.goto();
    await autoCompletePage.selectMultipleColors(['Red', 'Green', 'Blue']);
    await autoCompletePage.expectMultipleColors(['Red', 'Green', 'Blue']);

    await autoCompletePage.removeMultipleColor('Green');
    await autoCompletePage.expectMultipleColorRemoved('Green');
    await autoCompletePage.expectMultipleColors(['Red', 'Blue']);
  });

  test('replaces the selected single color', async ({ page }) => {
    const autoCompletePage = new AutoCompletePage(page);

    await autoCompletePage.goto();
    await autoCompletePage.selectSingleColor('Blue');
    await autoCompletePage.expectSingleColor('Blue');

    await autoCompletePage.selectSingleColor('Red');
    await autoCompletePage.expectSingleColor('Red');
  });
});
