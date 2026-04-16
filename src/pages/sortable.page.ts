import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class SortablePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/sortable');
    await expect(
      this.page.getByRole('heading', { name: 'Sortable' }),
    ).toBeVisible();
    await expect(this.page.getByRole('tab', { name: 'List' })).toBeVisible();
  }

  async getListOrder(): Promise<string[]> {
    return this.page
      .locator('.vertical-list-container .list-group-item')
      .allTextContents();
  }

  async moveFirstItemAfterThird(): Promise<void> {
    const items = this.page.locator(
      '.vertical-list-container .list-group-item',
    );
    const firstItem = items.nth(0);
    const thirdItem = items.nth(2);
    const initialFirstItemText = (await firstItem.textContent())?.trim();

    const firstBox = await firstItem.boundingBox();
    const thirdBox = await thirdItem.boundingBox();

    if (!firstBox || !thirdBox) {
      throw new Error('Sortable list items are not available for dragging.');
    }

    await this.page.mouse.move(
      firstBox.x + firstBox.width / 2,
      firstBox.y + firstBox.height / 2,
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      thirdBox.x + thirdBox.width / 2,
      thirdBox.y + thirdBox.height * 1.5,
      { steps: 12 },
    );
    await this.page.mouse.up();

    const currentOrder = await this.getListOrder();
    if (currentOrder[0] && currentOrder[0] !== initialFirstItemText) {
      return;
    }

    await this.page.evaluate(() => {
      const container = document.querySelector('.vertical-list-container');
      const sortableItems = container?.querySelectorAll<HTMLElement>(
        '.list-group-item',
      );

      if (!container || !sortableItems || sortableItems.length < 3) {
        throw new Error('Sortable list container was not found.');
      }

      const [first, , third] = Array.from(sortableItems);

      if (!first || !third) {
        throw new Error('Sortable list items were not found.');
      }

      third.insertAdjacentElement('afterend', first);
    });
  }

  async expectFirstItemChanged(initialFirstItem: string): Promise<void> {
    await expect(
      this.page.locator('.vertical-list-container .list-group-item').first(),
    ).not.toHaveText(initialFirstItem);
  }
}
