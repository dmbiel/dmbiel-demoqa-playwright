import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class RadioButtonPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/radio-button');
    await expect(
      this.page.getByRole('heading', { name: 'Radio Button' }),
    ).toBeVisible();
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
}
