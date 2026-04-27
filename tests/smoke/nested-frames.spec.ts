import { test } from '@playwright/test';

import { NestedFramesPage } from '../../src/pages/nested-frames.page';

test.describe('Smoke nested frames', () => {
  test('shows the expected parent and child frame text', async ({ page }) => {
    const nestedFramesPage = new NestedFramesPage(page);

    await nestedFramesPage.goto();
    await nestedFramesPage.expectParentFrameText();
    await nestedFramesPage.expectChildFrameText();
  });
});
