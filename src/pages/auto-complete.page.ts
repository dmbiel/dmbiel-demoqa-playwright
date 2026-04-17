import { expect, type Locator, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class AutoCompletePage {
  constructor(private readonly page: Page) {}

  private singleInput(): Locator {
    return this.page.locator('#autoCompleteSingleInput');
  }

  private multipleInput(): Locator {
    return this.page.locator('#autoCompleteMultipleInput');
  }

  private optionByText(color: string): Locator {
    return this.page
      .locator('.auto-complete__menu')
      .last()
      .getByText(color, { exact: true });
  }

  private multipleValueLabel(color: string): Locator {
    return this.page
      .locator('#autoCompleteMultipleContainer')
      .getByText(color, {
        exact: true,
      });
  }

  private removeMultipleValueButton(color: string): Locator {
    return this.page.getByRole('button', { name: `Remove ${color}` });
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/auto-complete');
    await expect(
      this.page.getByRole('heading', { name: 'Auto Complete' }),
    ).toBeVisible();
  }

  async selectMultipleColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await this.multipleInput().fill(color);
      await this.optionByText(color).click();
    }
  }

  async expectMultipleColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await expect(this.page.getByText(color, { exact: true })).toBeVisible();
    }
  }

  async selectSingleColor(color: string): Promise<void> {
    await this.singleInput().fill(color);
    await this.optionByText(color).click();
  }

  async expectSingleColor(color: string): Promise<void> {
    await expect(
      this.page.locator(
        '#autoCompleteSingleContainer .auto-complete__single-value',
      ),
    ).toHaveText(color);
  }

  async removeMultipleColor(color: string): Promise<void> {
    await this.removeMultipleValueButton(color).click();
  }

  async expectMultipleColorRemoved(color: string): Promise<void> {
    await expect(this.multipleValueLabel(color)).not.toBeVisible();
  }
}
