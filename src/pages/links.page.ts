import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class LinksPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/links');
    await expect(
      this.page.getByRole('heading', { name: 'Links', exact: true }),
    ).toBeVisible();
  }

  async openHomeLinkInNewTab(): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByRole('link', { name: 'Home' }).first().click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    return popup;
  }

  async triggerCreatedLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Created' }).click();
  }

  async expectCreatedLinkResponse(): Promise<void> {
    await expect(this.page.locator('#linkResponse')).toContainText(
      'Link has responded with staus 201 and status text Created',
    );
  }

  async openDynamicHomeLinkInNewTab(): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.getByRole('link', { name: 'Home' }).last().click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    return popup;
  }

  async triggerApiLink(linkName: string): Promise<void> {
    await this.page.getByRole('link', { name: linkName }).click();
  }

  async expectApiLinkResponse(
    statusCode: number,
    statusText: string,
  ): Promise<void> {
    await expect(this.page.locator('#linkResponse')).toContainText(
      `Link has responded with staus ${statusCode} and status text ${statusText}`,
    );
  }
}
