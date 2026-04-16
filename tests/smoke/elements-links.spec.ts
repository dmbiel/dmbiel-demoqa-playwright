import { expect, test } from '@playwright/test';

import { LinksPage } from '../../src/pages/links.page';

test.describe('Smoke links', () => {
  test('opens the Home link in a new tab', async ({ page }) => {
    const linksPage = new LinksPage(page);

    await linksPage.goto();

    const popup = await linksPage.openHomeLinkInNewTab();

    await expect(popup).toHaveURL(/https:\/\/demoqa\.com\/?$/);
    await expect(popup.locator('header a img')).toBeVisible();

    await popup.close();
  });

  test('shows the expected API response for the Created link', async ({
    page,
  }) => {
    const linksPage = new LinksPage(page);

    await linksPage.goto();
    await linksPage.triggerCreatedLink();
    await linksPage.expectCreatedLinkResponse();
  });
});
