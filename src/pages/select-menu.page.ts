import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class SelectMenuPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/select-menu');
    await expect(
      this.page.getByRole('heading', { name: 'Select Menu' }),
    ).toBeVisible();
  }

  async selectValue(optionText: string): Promise<void> {
    await this.page.locator('#withOptGroup').click();
    await this.page.locator('#react-select-2-input').fill(optionText);
    await this.page.locator('#react-select-2-input').press('Enter');
  }

  async expectSelectedValue(optionText: string): Promise<void> {
    await expect(this.page.locator('#withOptGroup')).toContainText(optionText);
  }

  async selectOldStyleColor(colorLabel: string): Promise<void> {
    await this.page
      .locator('#oldSelectMenu')
      .selectOption({ label: colorLabel });
  }

  async expectSelectedOldStyleColor(colorLabel: string): Promise<void> {
    await expect(
      this.page.locator('#oldSelectMenu').locator('option:checked'),
    ).toHaveText(colorLabel);
  }

  async selectCars(values: string[]): Promise<void> {
    await this.page.locator('#cars').selectOption(values);
  }

  async expectSelectedCars(values: string[]): Promise<void> {
    await expect(this.page.locator('#cars')).toHaveValues(values);
  }
}
