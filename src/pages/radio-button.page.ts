import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class RadioButtonPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/radio-button');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Radio Button',
      primaryControls: [this.page.locator('label[for="yesRadio"]')],
    });
  }

  async selectYes(): Promise<void> {
    await this.page.locator('label[for="yesRadio"]').click({ force: true });
  }

  async selectImpressive(): Promise<void> {
    await this.page
      .locator('label[for="impressiveRadio"]')
      .click({ force: true });
  }

  async expectSelectedValue(value: 'Yes' | 'Impressive'): Promise<void> {
    await expect(this.page.locator('.text-success')).toHaveText(value);
  }

  async expectNoOptionDisabled(): Promise<void> {
    await expect(this.page.locator('#noRadio')).toBeDisabled();
  }

  async expectYesChecked(): Promise<void> {
    await expect(this.page.locator('#yesRadio')).toBeChecked();
  }

  async expectImpressiveChecked(): Promise<void> {
    await expect(this.page.locator('#impressiveRadio')).toBeChecked();
  }

  async expectYesNotChecked(): Promise<void> {
    await expect(this.page.locator('#yesRadio')).not.toBeChecked();
  }

  async expectNoSelectionResult(): Promise<void> {
    await expect(this.page.locator('.text-success')).not.toBeVisible();
  }
}
