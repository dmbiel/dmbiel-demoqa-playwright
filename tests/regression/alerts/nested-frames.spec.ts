import { test } from '@playwright/test';

import { NestedFramesPage } from '../../../src/pages/nested-frames.page';

test.describe('Nested Frames', () => {
  test('shows the expected content in parent and child frames', async ({
    page,
  }) => {
    const nestedFramesPage = new NestedFramesPage(page);

    await nestedFramesPage.goto();
    await nestedFramesPage.expectParentFrameText();
    await nestedFramesPage.expectChildFrameText();
  });
});
