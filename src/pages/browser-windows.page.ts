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
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('#tabButton').click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    return popup;
  }

  async expectSamplePageOpened(popup: Page): Promise<void> {
    await expect(popup).toHaveURL(/\/sample$/);
    await expect(
      popup.getByRole('heading', { name: 'This is a sample page' }),
    ).toBeVisible();
  }
}
