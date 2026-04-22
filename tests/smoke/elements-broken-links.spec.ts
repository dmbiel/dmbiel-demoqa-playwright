import { test } from '@playwright/test';

import { BrokenLinksPage } from '../../src/pages/broken-links.page';

test.describe('Smoke broken links and images', () => {
  test('shows the broken links and image examples', async ({ page }) => {
    const brokenLinksPage = new BrokenLinksPage(page);

    await brokenLinksPage.goto();
    await brokenLinksPage.expectExampleSectionsVisible();
  });
});
