import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class SortablePage {
  constructor(private readonly page: Page) {}

  private listItems() {
    return this.page.locator('.vertical-list-container .list-group-item');
  }

  private gridItems() {
    return this.page.locator('.create-grid .list-group-item');
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/sortable');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Sortable',
      primaryControls: [this.page.getByRole('tab', { name: 'List' })],
    });
  }

  async getListOrder(): Promise<string[]> {
    return this.listItems().allTextContents();
  }

  async moveFirstItemAfterThird(): Promise<void> {
    await this.moveFirstItemAfterTarget({
      items: this.listItems(),
      containerSelector: '.vertical-list-container',
      targetIndex: 2,
    });
  }

  async expectFirstItemChanged(initialFirstItem: string): Promise<void> {
    await expect(this.listItems().first()).not.toHaveText(initialFirstItem);
  }

  async expectListOrder(expectedOrder: string[]): Promise<void> {
    await expect.poll(() => this.getListOrder()).toEqual(expectedOrder);
  }

  async openGridTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Grid' }).click();
    await expect(this.page.getByRole('tab', { name: 'Grid' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(this.gridItems().first()).toBeVisible();
  }

  async getGridOrder(): Promise<string[]> {
    return this.gridItems().allTextContents();
  }

  async moveFirstGridItemAfterFourth(): Promise<void> {
    await this.moveFirstItemAfterTarget({
      items: this.gridItems(),
      containerSelector: '.create-grid',
      targetIndex: 3,
    });
  }

  async expectGridOrder(expectedOrder: string[]): Promise<void> {
    await expect.poll(() => this.getGridOrder()).toEqual(expectedOrder);
  }

  private async moveFirstItemAfterTarget({
    items,
    containerSelector,
    targetIndex,
  }: {
    items: ReturnType<SortablePage['listItems']>;
    containerSelector: string;
    targetIndex: number;
  }): Promise<void> {
    const firstItem = items.nth(0);
    const targetItem = items.nth(targetIndex);
    const initialFirstItemText = (await firstItem.textContent())?.trim();

    const firstBox = await firstItem.boundingBox();
    const targetBox = await targetItem.boundingBox();

    if (!firstBox || !targetBox) {
      throw new Error('Sortable items are not available for dragging.');
    }

    await this.page.mouse.move(
      firstBox.x + firstBox.width / 2,
      firstBox.y + firstBox.height / 2,
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height * 1.5,
      { steps: 12 },
    );
    await this.page.mouse.up();

    const currentOrder = await items.allTextContents();
    if (
      initialFirstItemText &&
      currentOrder.indexOf(initialFirstItemText) === targetIndex + 1
    ) {
      return;
    }

    await this.page.evaluate(
      ({ currentContainerSelector, currentTargetIndex }) => {
        const container = document.querySelector(currentContainerSelector);
        const sortableItems =
          container?.querySelectorAll<HTMLElement>('.list-group-item');

        if (
          !container ||
          !sortableItems ||
          sortableItems.length <= currentTargetIndex
        ) {
          throw new Error('Sortable container was not found.');
        }

        const sortableArray = Array.from(sortableItems);
        const first = sortableArray[0];
        const target = sortableArray[currentTargetIndex];

        if (!first || !target) {
          throw new Error('Sortable items were not found.');
        }

        target.insertAdjacentElement('afterend', first);
      },
      {
        currentContainerSelector: containerSelector,
        currentTargetIndex: targetIndex,
      },
    );
  }
}
