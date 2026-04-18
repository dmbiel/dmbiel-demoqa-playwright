import { expect, test } from '@playwright/test';

import { ProgressBarPage } from '../../../src/pages/progress-bar.page';

test.describe('Progress Bar', () => {
  test('starts from zero and stays stopped after clicking Stop', async ({
    page,
  }) => {
    const progressBarPage = new ProgressBarPage(page);

    await progressBarPage.goto();
    await progressBarPage.expectInitialState();

    await progressBarPage.start();
    await progressBarPage.stopWhenProgressReaches(25);
    await progressBarPage.expectStoppedState(25, 99);

    const stoppedValue = await progressBarPage.getProgressValue();
    expect(stoppedValue).toBeGreaterThanOrEqual(25);
    await progressBarPage.expectProgressStoppedAt(stoppedValue);
  });

  test('reaches 100 percent and resets back to zero', async ({ page }) => {
    const progressBarPage = new ProgressBarPage(page);

    await progressBarPage.goto();
    await progressBarPage.completeProgress();
    await progressBarPage.reset();
    await progressBarPage.expectResetState();
  });
});
