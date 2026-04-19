import { expect, test } from '@playwright/test';

import { LinksPage } from '../../../src/pages/links.page';

test.describe('Links', () => {
  test('opens both home links in a new tab', async ({ page }) => {
    const linksPage = new LinksPage(page);

    await linksPage.goto();

    const homePopup = await linksPage.openHomeLinkInNewTab();
    await expect(homePopup).toHaveURL(/https:\/\/demoqa\.com\/?$/);
    await homePopup.close();

    const dynamicHomePopup = await linksPage.openDynamicHomeLinkInNewTab();
    await expect(dynamicHomePopup).toHaveURL(/https:\/\/demoqa\.com\/?$/);
    await dynamicHomePopup.close();
  });

  test('shows the expected responses for API-style links', async ({ page }) => {
    const linksPage = new LinksPage(page);

    await linksPage.goto();

    await linksPage.triggerApiLink('Created');
    await linksPage.expectApiLinkResponse(201, 'Created');

    await linksPage.triggerApiLink('No Content');
    await linksPage.expectApiLinkResponse(204, 'No Content');

    await linksPage.triggerApiLink('Not Found');
    await linksPage.expectApiLinkResponse(404, 'Not Found');
  });
});
