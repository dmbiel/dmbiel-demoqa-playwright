import { expect, type Locator, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class SelectablePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/selectable');
    await expect(
      this.page.getByRole('heading', { name: 'Selectable' }),
    ).toBeVisible();
    await expect(this.page.getByRole('tab', { name: 'List' })).toBeVisible();
  }

  async selectListItem(name: string): Promise<void> {
    await this.getListItem(name).click();
  }

  async expectListItemSelected(name: string): Promise<void> {
    await expect(this.getListItem(name)).toHaveClass(/active/);
  }

  private getListItem(name: string): Locator {
    return this.page
      .locator('#verticalListContainer li')
      .filter({ hasText: name })
      .first();
  }
}
