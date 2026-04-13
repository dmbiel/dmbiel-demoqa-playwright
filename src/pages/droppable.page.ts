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

    await simpleTabPanel
      .locator('#draggable')
      .dragTo(simpleTabPanel.locator('#droppable'));
  }

  async expectSuccessfulDrop(): Promise<void> {
    await expect(
      this.page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable'),
    ).toContainText('Dropped!');
  }
}
