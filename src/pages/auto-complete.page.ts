import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class AutoCompletePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/auto-complete');
    await expect(
      this.page.getByRole('heading', { name: 'Auto Complete' }),
    ).toBeVisible();
  }

  async selectMultipleColors(colors: string[]): Promise<void> {
    const input = this.page.locator('#autoCompleteMultipleInput');

    for (const color of colors) {
      await input.fill(color);
      await input.press('Enter');
    }
  }

  async expectMultipleColors(colors: string[]): Promise<void> {
    for (const color of colors) {
      await expect(this.page.getByText(color, { exact: true })).toBeVisible();
    }
  }

  async selectSingleColor(color: string): Promise<void> {
    const input = this.page.locator('#autoCompleteSingleInput');

    await input.fill(color);
    await input.press('Enter');
  }

  async expectSingleColor(color: string): Promise<void> {
    await expect(this.page.locator('#autoCompleteSingleInput')).toHaveValue(
      color,
    );
  }
}
