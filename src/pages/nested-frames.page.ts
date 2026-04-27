import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class NestedFramesPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/nestedframes');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Nested Frames',
      primaryControls: [this.page.locator('#frame1')],
    });
  }

  async expectParentFrameText(): Promise<void> {
    await expect(this.page.frameLocator('#frame1').locator('body')).toContainText(
      'Parent frame',
    );
  }

  async expectChildFrameText(): Promise<void> {
    await expect(
      this.page.frameLocator('#frame1').frameLocator('iframe').locator('body'),
    ).toContainText('Child Iframe');
  }
}
