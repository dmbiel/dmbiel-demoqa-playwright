import { test } from '@playwright/test';

import { FramesPage } from '../../src/pages/frames.page';

test.describe('Smoke frames', () => {
  test('loads the sample content inside the main frame', async ({ page }) => {
    const framesPage = new FramesPage(page);

    await framesPage.goto();
    await framesPage.expectFirstFrameSampleHeading();
  });
});
