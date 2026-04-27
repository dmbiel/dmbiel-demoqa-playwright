import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class FramesPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/frames');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Frames',
      primaryControls: [this.page.locator('#frame1')],
    });
  }

  async expectFirstFrameSampleHeading(): Promise<void> {
    await expect(
      this.page
        .frameLocator('#frame1')
        .getByRole('heading', { name: 'This is a sample page' }),
    ).toBeVisible();
  }
}
