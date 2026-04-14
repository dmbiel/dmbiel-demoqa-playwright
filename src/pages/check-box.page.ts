import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class CheckBoxPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/checkbox');
    await expect(
      this.page.getByRole('heading', { name: 'Check Box' }),
    ).toBeVisible();
  }

  async selectHome(): Promise<void> {
    await this.page.getByRole('checkbox', { name: 'Select Home' }).check();
  }

  async expectHomeSelectionSummary(): Promise<void> {
    const result = this.page.locator('#result');

    await expect(result).toBeVisible();
    await expect(result).toContainText('home');
    await expect(result).toContainText('desktop');
    await expect(result).toContainText('notes');
    await expect(result).toContainText('commands');
    await expect(result).toContainText('documents');
    await expect(result).toContainText('workspace');
    await expect(result).toContainText('react');
    await expect(result).toContainText('angular');
    await expect(result).toContainText('veu');
    await expect(result).toContainText('office');
    await expect(result).toContainText('public');
    await expect(result).toContainText('private');
    await expect(result).toContainText('classified');
    await expect(result).toContainText('general');
    await expect(result).toContainText('downloads');
    await expect(result).toContainText('wordFile');
    await expect(result).toContainText('excelFile');
  }
}
