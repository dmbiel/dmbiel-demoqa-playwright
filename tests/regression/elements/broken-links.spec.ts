import { expect, test } from '@playwright/test';

import { BrokenLinksPage } from '../../../src/pages/broken-links.page';

test.describe('Broken Links - Images', () => {
  test('keeps the broken image example in a failed render state', async ({
    page,
  }) => {
    const brokenLinksPage = new BrokenLinksPage(page);

    await brokenLinksPage.goto();
    await brokenLinksPage.expectBrokenImageNotRendered();
  });

  test('points the valid link example back to DemoQA', async ({ page }) => {
    const brokenLinksPage = new BrokenLinksPage(page);

    await brokenLinksPage.goto();

    const response = await brokenLinksPage.requestValidLink();

    await expect(response.url()).toMatch(/^https:\/\/demoqa\.com\/?$/);
    await expect(response.ok()).toBe(true);
  });

  test('keeps the broken link example on an HTTP 500 target', async ({
    page,
  }) => {
    const brokenLinksPage = new BrokenLinksPage(page);

    await brokenLinksPage.goto();

    const response = await brokenLinksPage.requestBrokenLink();

    await expect(response.status()).toBe(500);
  });
});
