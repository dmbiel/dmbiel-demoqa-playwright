import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class DroppablePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/droppable');
    await expect(
      this.page.getByRole('heading', { name: 'Droppable' }),
    ).toBeVisible();
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
}
