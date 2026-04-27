import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class BrowserWindowsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/browser-windows');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Browser Windows',
      primaryControls: [this.page.locator('#tabButton')],
    });
  }

  async openNewTab(): Promise<Page> {
    return this.openPopupFromButton('#tabButton');
  }

  async openNewWindow(): Promise<Page> {
    return this.openPopupFromButton('#windowButton');
  }

  async openNewWindowMessage(): Promise<Page> {
    return this.openPopupFromButton('#messageWindowButton');
  }

  async expectSamplePageOpened(popup: Page): Promise<void> {
    await expect(popup).toHaveURL(/\/sample$/);
    await expect(
      popup.getByRole('heading', { name: 'This is a sample page' }),
    ).toBeVisible();
  }

  async expectMessageWindowOpened(popup: Page): Promise<void> {
    await expect(popup.locator('body')).toContainText(
      'Knowledge increases by sharing',
    );
  }

  private async openPopupFromButton(buttonSelector: string): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator(buttonSelector).click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    return popup;
  }
}
