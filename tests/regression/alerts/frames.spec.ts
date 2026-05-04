import { test } from '@playwright/test';

import { FramesPage } from '../../../src/pages/frames.page';

test.describe('Frames', () => {
  test('shows the sample content in both frame variants', async ({ page }) => {
    const framesPage = new FramesPage(page);

    await framesPage.goto();
    await framesPage.expectFirstFrameSampleHeading();
    await framesPage.expectSecondFrameSampleHeading();
  });
});
