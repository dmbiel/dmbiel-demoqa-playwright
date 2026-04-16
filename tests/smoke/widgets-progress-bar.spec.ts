import { test } from '@playwright/test';

import { ProgressBarPage } from '../../src/pages/progress-bar.page';

test.describe('Smoke progress bar', () => {
  test('starts, stops, and resets the progress bar', async ({ page }) => {
    const progressBarPage = new ProgressBarPage(page);

    await progressBarPage.goto();
    await progressBarPage.start();
    await progressBarPage.stopWhenProgressReaches(20);
    await progressBarPage.expectStoppedState(20, 99);
    await progressBarPage.completeProgress();
    await progressBarPage.reset();
    await progressBarPage.expectResetState();
  });
});
