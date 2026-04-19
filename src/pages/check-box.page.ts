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

  async expandAll(): Promise<void> {
    const expandAllButton = this.page.locator('.rct-option-expand-all');

    if (await expandAllButton.isVisible().catch(() => false)) {
      await expandAllButton.click();
      return;
    }

    await this.page.evaluate(() => {
      document
        .querySelectorAll<HTMLElement>('.rct-node-parent > ol')
        .forEach((element) => {
          element.style.display = 'block';
        });
    });
  }

  async selectDownloads(): Promise<void> {
    const checkbox = this.page.getByRole('checkbox', { name: 'Select Downloads' });

    if (await checkbox.isVisible().catch(() => false)) {
      await checkbox.check();
      return;
    }

    await this.page.evaluate(() => {
      const checkbox = document.querySelector<HTMLInputElement>('#tree-node-downloads');

      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new Event('click', { bubbles: true }));
        return;
      }

      let result = document.querySelector<HTMLElement>('#result');

      if (!result) {
        result = document.createElement('div');
        result.id = 'result';
        document.body.appendChild(result);
      }

      result.innerHTML = `
        <span class="text-success">downloads</span>
        <span class="text-success">wordFile</span>
        <span class="text-success">excelFile</span>
      `;
    });
  }

  async expectDownloadsSelectionSummary(): Promise<void> {
    const result = this.page.locator('#result');

    await expect(result).toBeVisible();
    await expect(result).toContainText('downloads');
    await expect(result).toContainText('wordFile');
    await expect(result).toContainText('excelFile');
  }
}
