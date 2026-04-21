import { expect, type Locator, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class DynamicPropertiesPage {
  constructor(private readonly page: Page) {}

  private colorChangeButton(): Locator {
    return this.page.locator('#colorChange');
  }

  private enableAfterButton(): Locator {
    return this.page.locator('#enableAfter');
  }

  private visibleAfterButton(): Locator {
    return this.page.locator('#visibleAfter');
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/dynamic-properties');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Dynamic Properties',
      primaryControls: [this.colorChangeButton(), this.enableAfterButton()],
    });
  }

  async expectEnableAfterButtonInitiallyDisabled(): Promise<void> {
    await expect(this.enableAfterButton()).toBeDisabled();
  }

  async waitForEnableAfterButtonToBeEnabled(): Promise<void> {
    await expect(this.enableAfterButton()).toBeEnabled({ timeout: 10_000 });
  }

  async expectVisibleAfterButtonInitiallyHidden(): Promise<void> {
    await expect(this.visibleAfterButton()).not.toBeVisible();
  }

  async waitForVisibleAfterButtonToBeVisible(): Promise<void> {
    await expect(this.visibleAfterButton()).toBeVisible({ timeout: 10_000 });
  }

  async expectColorChangeAfterDelay(): Promise<void> {
    const initialColor = await this.colorChangeButton().evaluate((element) => {
      return window.getComputedStyle(element).color;
    });

    await expect
      .poll(
        async () => {
          return this.colorChangeButton().evaluate((element) => {
            return window.getComputedStyle(element).color;
          });
        },
        {
          message: 'Expected the color change button to switch styles.',
          timeout: 10_000,
        },
      )
      .not.toBe(initialColor);
  }
}
