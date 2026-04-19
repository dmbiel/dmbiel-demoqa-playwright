import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class TabsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/tabs');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Tabs',
      primaryControls: [this.page.locator('#demo-tab-what')],
    });
  }

  async expectWhatTabVisible(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: 'What' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(this.page.locator('#demo-tabpane-what')).toContainText(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    );
  }

  async openOriginTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Origin' }).click();
  }

  async expectOriginTabVisible(): Promise<void> {
    await expect(
      this.page.getByRole('tab', { name: 'Origin' }),
    ).toHaveAttribute('aria-selected', 'true');
    await expect(this.page.locator('#demo-tabpane-origin')).toContainText(
      'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    );
  }

  async openUseTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Use' }).click();
  }

  async expectUseTabVisible(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: 'Use' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(this.page.locator('#demo-tabpane-use')).toContainText(
      'It is a long established fact that a reader will be distracted',
    );
  }

  async expectMoreTabDisabled(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: 'More' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  async tryToOpenMoreTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'More' }).click({ force: true });
  }

  async expectWhatTabStillVisible(): Promise<void> {
    await expect(this.page.getByRole('tab', { name: 'What' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(this.page.locator('#demo-tabpane-what')).toBeVisible();
  }
}
