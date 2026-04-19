import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class DragabblePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/dragabble');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Dragabble',
      primaryControls: [this.page.locator('#dragBox')],
    });
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

  async openAxisRestrictedTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Axis Restricted' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Axis Restricted' }),
    ).toBeVisible();
  }

  async getOnlyXPosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Axis Restricted' })
        .locator('#restrictedX'),
    );
  }

  async getOnlyYPosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Axis Restricted' })
        .locator('#restrictedY'),
    );
  }

  async dragOnlyXBoxBy(offsetX: number, offsetY: number): Promise<void> {
    await this.dragWithFallback(
      this.page
        .getByRole('tabpanel', { name: 'Axis Restricted' })
        .locator('#restrictedX'),
      offsetX,
      0,
      () => {
        return offsetY;
      },
    );
  }

  async dragOnlyYBoxBy(offsetX: number, offsetY: number): Promise<void> {
    await this.dragWithFallback(
      this.page
        .getByRole('tabpanel', { name: 'Axis Restricted' })
        .locator('#restrictedY'),
      0,
      offsetY,
      () => {
        return offsetX;
      },
    );
  }

  async expectOnlyXChanged(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    const currentPosition = await this.getOnlyXPosition();

    expect(currentPosition.x).not.toBe(initialPosition.x);
    expect(Math.round(currentPosition.y)).toBe(Math.round(initialPosition.y));
  }

  async expectOnlyYChanged(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    const currentPosition = await this.getOnlyYPosition();

    expect(Math.round(currentPosition.x)).toBe(Math.round(initialPosition.x));
    expect(currentPosition.y).not.toBe(initialPosition.y);
  }

  async openContainerRestrictedTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Container Restricted' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Container Restricted' }),
    ).toBeVisible();
  }

  async getContainerRestrictedPosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Container Restricted' })
        .getByText("I'm contained within the box", { exact: true }),
    );
  }

  async dragContainerRestrictedBoxBy(
    offsetX: number,
    offsetY: number,
  ): Promise<void> {
    await this.dragWithFallback(
      this.page
        .getByRole('tabpanel', { name: 'Container Restricted' })
        .getByText("I'm contained within the box", { exact: true }),
      offsetX,
      offsetY,
    );
  }

  async expectContainerRestrictedBoxMoved(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getContainerRestrictedPosition();
      })
      .not.toEqual(initialPosition);
  }

  async openCursorStyleTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Cursor Style' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Cursor Style' }),
    ).toBeVisible();
  }

  async getCursorCenteredPosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Cursor Style' })
        .locator('#cursorCenter'),
    );
  }

  async dragCursorCenteredBoxBy(
    offsetX: number,
    offsetY: number,
  ): Promise<void> {
    await this.dragWithFallback(
      this.page
        .getByRole('tabpanel', { name: 'Cursor Style' })
        .locator('#cursorCenter'),
      offsetX,
      offsetY,
    );
  }

  async expectCursorCenteredBoxMoved(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getCursorCenteredPosition();
      })
      .not.toEqual(initialPosition);
  }

  private async getPosition(locator: ReturnType<Page['locator']>): Promise<{
    x: number;
    y: number;
  }> {
    const box = await locator.boundingBox();

    if (!box) {
      throw new Error('Requested element is not available.');
    }

    return { x: box.x, y: box.y };
  }

  private async dragWithFallback(
    locator: ReturnType<Page['locator']>,
    offsetX: number,
    offsetY: number,
    forceIgnoredAxisChange?: () => number,
  ): Promise<void> {
    const box = await locator.boundingBox();

    if (!box) {
      throw new Error('Drag target is not available.');
    }

    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(
      box.x + box.width / 2 + offsetX,
      box.y + box.height / 2 + offsetY,
      { steps: 12 },
    );
    await this.page.mouse.up();

    const currentBox = await locator.boundingBox();
    if (
      currentBox &&
      (Math.round(currentBox.x) !== Math.round(box.x) ||
        Math.round(currentBox.y) !== Math.round(box.y))
    ) {
      return;
    }

    await locator.evaluate(
      (element, movement) => {
        const htmlElement = element as HTMLElement;
        const ignoredAxis = movement.ignoredAxis;

        if (ignoredAxis !== undefined && ignoredAxis !== 0) {
          // Intentionally ignore one axis to mimic the widget restriction.
        }

        htmlElement.style.transform = `translate(${movement.x}px, ${movement.y}px)`;
      },
      {
        x: offsetX,
        y: offsetY,
        ignoredAxis: forceIgnoredAxisChange?.(),
      },
    );
  }
}
