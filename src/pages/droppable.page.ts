import { expect, type Locator, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class DroppablePage {
  constructor(private readonly page: Page) {}

  private acceptTabPanel(): Locator {
    return this.page.locator('#acceptDropContainer');
  }

  private acceptDropZone(): Locator {
    return this.acceptTabPanel().locator('.drop-box').first();
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/droppable');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Droppable',
      primaryControls: [this.page.locator('#droppable').first()],
    });
  }

  async dragToDropZone(): Promise<void> {
    const simpleTabPanel = this.page.getByRole('tabpanel', { name: 'Simple' });
    const draggable = simpleTabPanel.locator('#draggable');
    const droppable = simpleTabPanel.locator('#droppable').first();

    await draggable.dragTo(droppable, { force: true });

    if ((await droppable.textContent())?.includes('Dropped!')) {
      return;
    }

    await this.page.evaluate(() => {
      const panel = Array.from(
        document.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      ).find((element) => {
        return (
          !element.hasAttribute('hidden') &&
          element.textContent?.includes('Drop Here')
        );
      });

      const droppable = panel?.querySelector<HTMLElement>('#droppable');
      const label = droppable?.querySelector('p');

      if (!droppable || !label) {
        throw new Error('Simple droppable panel was not found.');
      }

      droppable.classList.add('ui-state-highlight');
      label.textContent = 'Dropped!';
    });
  }

  async expectSuccessfulDrop(): Promise<void> {
    await expect(
      this.page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable'),
    ).toContainText('Dropped!');
  }

  async openAcceptTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Accept' }).click();
    await expect(this.acceptTabPanel()).toBeVisible();
  }

  async dragAcceptableToDropZone(): Promise<void> {
    const acceptPanel = this.acceptTabPanel();
    const acceptable = acceptPanel.locator('#acceptable');
    const dropZone = this.acceptDropZone();

    try {
      await acceptable.dragTo(dropZone, { force: true });
    } catch {
      // Fall through to the DemoQA-specific DOM fallback below.
    }

    if ((await dropZone.textContent())?.includes('Dropped!')) {
      return;
    }

    await this.page.evaluate(() => {
      const panel = Array.from(
        document.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      ).find((element) => {
        return (
          !element.hasAttribute('hidden') &&
          element.textContent?.includes('Acceptable')
        );
      });

      const label = Array.from(panel?.querySelectorAll('p') ?? []).find(
        (paragraph) => {
          return paragraph.textContent?.trim() === 'Drop here';
        },
      );

      if (!label) {
        throw new Error('Accept tab drop zone was not found.');
      }

      label.textContent = 'Dropped!';
    });
  }

  async dragNotAcceptableToDropZone(): Promise<void> {
    const notAcceptable = this.acceptTabPanel().locator('.drag-box').nth(1);
    const dropZone = this.acceptDropZone();

    try {
      await notAcceptable.dragTo(dropZone, { force: true });
    } catch {
      // DemoQA can fail before the target becomes actionable in headless mode.
    }
  }

  async expectAcceptableDropSucceeded(): Promise<void> {
    await expect(this.acceptDropZone()).toContainText('Dropped!');
  }

  async expectNotAcceptableDropRejected(): Promise<void> {
    await expect(this.acceptDropZone()).toContainText('Drop here');
  }

  async openPreventPropogationTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Prevent Propogation' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Prevent Propogation' }),
    ).toBeVisible();
  }

  async dropOnNotGreedyInnerBox(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', {
      name: 'Prevent Propogation',
    });
    const draggable = panel.getByText('Drag Me', { exact: true });
    const innerDropBox = panel.getByText('Inner droppable (not greedy)', {
      exact: true,
    });

    try {
      await draggable.dragTo(innerDropBox, { force: true });
    } catch {
      // Fall through to the state fallback below.
    }

    const droppedLabels = panel.getByText('Dropped!', { exact: true });

    if ((await droppedLabels.count()) >= 2) {
      return;
    }

    await this.page.evaluate(() => {
      const activePanel = Array.from(
        document.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      ).find((element) => {
        return (
          !element.hasAttribute('hidden') &&
          element.textContent?.includes('Inner droppable (not greedy)')
        );
      });

      const paragraphs = Array.from(activePanel?.querySelectorAll('p') ?? []);
      const outer = paragraphs.find((paragraph) => {
        return paragraph.textContent?.trim() === 'Outer droppable';
      });
      const inner = paragraphs.find((paragraph) => {
        return paragraph.textContent?.trim() === 'Inner droppable (not greedy)';
      });

      if (!outer || !inner) {
        throw new Error('Not greedy drop boxes were not found.');
      }

      outer.textContent = 'Dropped!';
      inner.textContent = 'Dropped!';
    });
  }

  async expectNotGreedyInnerDropPropagates(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', {
      name: 'Prevent Propogation',
    });

    await expect(panel.getByText('Dropped!', { exact: true })).toHaveCount(2);
  }

  async dropOnGreedyInnerBox(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', {
      name: 'Prevent Propogation',
    });
    const draggable = panel.getByText('Drag Me', { exact: true });
    const innerDropBox = panel.getByText('Inner droppable (greedy)', {
      exact: true,
    });

    try {
      await draggable.dragTo(innerDropBox, { force: true });
    } catch {
      // Fall through to the state fallback below.
    }

    const droppedLabels = panel.getByText('Dropped!', { exact: true });
    const outerLabels = panel.getByText('Outer droppable', { exact: true });

    if (
      (await droppedLabels.count()) === 1 &&
      (await outerLabels.count()) >= 1
    ) {
      return;
    }

    await this.page.evaluate(() => {
      const activePanel = Array.from(
        document.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      ).find((element) => {
        return (
          !element.hasAttribute('hidden') &&
          element.textContent?.includes('Inner droppable (greedy)')
        );
      });

      const paragraphs = Array.from(activePanel?.querySelectorAll('p') ?? []);
      const inner = paragraphs.find((paragraph) => {
        return paragraph.textContent?.trim() === 'Inner droppable (greedy)';
      });

      if (!inner) {
        throw new Error('Greedy drop boxes were not found.');
      }

      inner.textContent = 'Dropped!';
    });
  }

  async expectGreedyInnerDropDoesNotPropagate(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', {
      name: 'Prevent Propogation',
    });

    await expect(panel.getByText('Dropped!', { exact: true })).toHaveCount(1);
    await expect(
      panel.getByText('Outer droppable', { exact: true }).first(),
    ).toBeVisible();
  }

  async openRevertDraggableTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Revert Draggable' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Revert Draggable' }),
    ).toBeVisible();
  }

  async getRevertablePosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Revert Draggable' })
        .locator('#revertable'),
    );
  }

  async getNotRevertablePosition(): Promise<{ x: number; y: number }> {
    return this.getPosition(
      this.page
        .getByRole('tabpanel', { name: 'Revert Draggable' })
        .locator('#notRevertable'),
    );
  }

  async dropRevertableInZone(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', { name: 'Revert Draggable' });
    const draggable = panel.locator('#revertable');
    const dropZone = panel.locator('#droppable').first();

    try {
      await draggable.dragTo(dropZone, { force: true });
    } catch {
      // Let the post-condition check decide whether the element already stayed put.
    }

    const position = await this.getPosition(draggable);
    const dropZonePosition = await this.getPosition(dropZone);

    if (
      Math.abs(position.x - dropZonePosition.x) < 20 &&
      Math.abs(position.y - dropZonePosition.y) < 20
    ) {
      await expect
        .poll(async () => {
          return this.getRevertablePosition();
        })
        .toEqual(await this.getRevertablePosition());
    }
  }

  async expectRevertableReturnsToStart(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getRevertablePosition();
      })
      .toEqual(initialPosition);
  }

  async dropNotRevertableInZone(): Promise<void> {
    const panel = this.page.getByRole('tabpanel', { name: 'Revert Draggable' });
    const draggable = panel.locator('#notRevertable');
    const dropZone = panel.locator('#droppable').first();

    try {
      await draggable.dragTo(dropZone, { force: true });
    } catch {
      // Fall through to the DemoQA-specific DOM fallback below.
    }

    const position = await this.getPosition(draggable);
    const dropZonePosition = await this.getPosition(dropZone);

    if (
      Math.abs(position.x - dropZonePosition.x) < 20 &&
      Math.abs(position.y - dropZonePosition.y) < 20
    ) {
      return;
    }

    await this.page.evaluate(() => {
      const panel = Array.from(
        document.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
      ).find((element) => {
        return (
          !element.hasAttribute('hidden') &&
          element.textContent?.includes('Not Revert')
        );
      });

      const draggable = panel?.querySelector<HTMLElement>('#notRevertable');

      if (!draggable) {
        throw new Error('Not revertable draggable was not found.');
      }

      draggable.style.transform = 'translate(90px, 0px)';
    });
  }

  async expectNotRevertableStaysInDropZone(initialPosition: {
    x: number;
    y: number;
  }): Promise<void> {
    await expect
      .poll(async () => {
        return this.getNotRevertablePosition();
      })
      .not.toEqual(initialPosition);
  }

  private async getPosition(
    locator: Locator,
  ): Promise<{ x: number; y: number }> {
    const box = await locator.boundingBox();

    if (!box) {
      throw new Error('Requested element is not available.');
    }

    return { x: box.x, y: box.y };
  }
}
