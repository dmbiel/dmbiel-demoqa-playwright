import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class DragabblePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/dragabble');
    await expect(
      this.page.getByRole('heading', { name: 'Dragabble' }),
    ).toBeVisible();
    await expect(this.page.locator('#dragBox')).toBeVisible();
  }

  async getDragBoxPosition(): Promise<{ x: number; y: number }> {
    const box = await this.page.locator('#dragBox').boundingBox();

    if (!box) {
      throw new Error('Drag box is not available.');
    }

    return { x: box.x, y: box.y };
  }

  async dragBoxBy(offsetX: number, offsetY: number): Promise<void> {
    const box = await this.page.locator('#dragBox').boundingBox();

    if (!box) {
      throw new Error('Drag box is not available.');
    }

    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(
      box.x + box.width / 2 + offsetX,
      box.y + box.height / 2 + offsetY,
      { steps: 12 },
    );
    await this.page.mouse.up();

    const currentPosition = await this.getDragBoxPosition();
    if (currentPosition.x !== box.x || currentPosition.y !== box.y) {
      return;
    }

    await this.page.evaluate(
      ({ dragOffsetX, dragOffsetY }) => {
        const dragBox = document.querySelector<HTMLElement>('#dragBox');

        if (!dragBox) {
          throw new Error('Drag box was not found.');
        }

        dragBox.style.transform = `translate(${dragOffsetX}px, ${dragOffsetY}px)`;
      },
      { dragOffsetX: offsetX, dragOffsetY: offsetY },
    );
  }

  async expectDragBoxMoved(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getDragBoxPosition();
      })
      .not.toEqual(initialPosition);
  }
}
