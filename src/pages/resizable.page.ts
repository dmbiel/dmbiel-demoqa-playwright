import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class ResizablePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/resizable');
    await expect(
      this.page.getByRole('heading', { name: 'Resizable' }),
    ).toBeVisible();
    await expect(this.page.locator('#resizable')).toBeVisible();
  }

  async getFreeBoxSize(): Promise<{ width: number; height: number }> {
    const box = await this.page.locator('#resizable').boundingBox();

    if (!box) {
      throw new Error('Free resizable box is not available.');
    }

    return { width: box.width, height: box.height };
  }

  async resizeFreeBoxBy(offsetX: number, offsetY: number): Promise<void> {
    const handle = this.page.locator(
      '#resizable .react-resizable-handle.react-resizable-handle-se',
    );
    const handleBox = await handle.boundingBox();

    if (!handleBox) {
      throw new Error('Resizable handle is not available.');
    }

    await this.page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2,
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      handleBox.x + handleBox.width / 2 + offsetX,
      handleBox.y + handleBox.height / 2 + offsetY,
      { steps: 12 },
    );
    await this.page.mouse.up();
  }

  async expectFreeBoxGrew(initialSize: {
    width: number;
    height: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getFreeBoxSize();
      })
      .toMatchObject({
        width: expect.any(Number),
        height: expect.any(Number),
      });

    const currentSize = await this.getFreeBoxSize();

    expect(currentSize.width).toBeGreaterThan(initialSize.width);
    expect(currentSize.height).toBeGreaterThan(initialSize.height);
  }

  async getConstrainedBoxSize(): Promise<{ width: number; height: number }> {
    const box = await this.page
      .locator('#resizableBoxWithRestriction')
      .boundingBox();

    if (!box) {
      throw new Error('Constrained resizable box is not available.');
    }

    return { width: box.width, height: box.height };
  }

  async resizeConstrainedBoxBy(
    offsetX: number,
    offsetY: number,
  ): Promise<void> {
    const handle = this.page.locator(
      '#resizableBoxWithRestriction .react-resizable-handle.react-resizable-handle-se',
    );

    await this.resizeFromHandle(handle, offsetX, offsetY);
  }

  async expectConstrainedBoxWithinBounds(
    maxWidth: number,
    maxHeight: number,
  ): Promise<void> {
    const currentSize = await this.getConstrainedBoxSize();

    expect(currentSize.width).toBeLessThanOrEqual(maxWidth);
    expect(currentSize.height).toBeLessThanOrEqual(maxHeight);
  }

  async expectConstrainedBoxReachedGrowthLimit(
    initialSize: { width: number; height: number },
    maxWidth: number,
    maxHeight: number,
  ): Promise<void> {
    await expect
      .poll(async () => {
        return this.getConstrainedBoxSize();
      })
      .toMatchObject({
        width: expect.any(Number),
        height: expect.any(Number),
      });

    const currentSize = await this.getConstrainedBoxSize();

    expect(currentSize.width).toBeGreaterThanOrEqual(initialSize.width);
    expect(currentSize.height).toBeGreaterThanOrEqual(initialSize.height);
    expect(currentSize.width).toBeLessThanOrEqual(maxWidth);
    expect(currentSize.height).toBeLessThanOrEqual(maxHeight);
  }

  private async resizeFromHandle(
    handle: ReturnType<Page['locator']>,
    offsetX: number,
    offsetY: number,
  ): Promise<void> {
    const handleBox = await handle.boundingBox();

    if (!handleBox) {
      throw new Error('Resizable handle is not available.');
    }

    await this.page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2,
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      handleBox.x + handleBox.width / 2 + offsetX,
      handleBox.y + handleBox.height / 2 + offsetY,
      { steps: 12 },
    );
    await this.page.mouse.up();
  }
}
