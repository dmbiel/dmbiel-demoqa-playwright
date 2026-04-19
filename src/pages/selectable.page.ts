import { expect, type Locator, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class SelectablePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/selectable');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Selectable',
      primaryControls: [this.page.getByRole('tab', { name: 'List' })],
    });
  }

  async selectListItem(name: string): Promise<void> {
    await this.getListItem(name).click();
  }

  async expectListItemSelected(name: string): Promise<void> {
    await expect(this.getListItem(name)).toHaveClass(/active/);
  }

  async expectListItemsSelected(names: string[]): Promise<void> {
    for (const name of names) {
      await expect(this.getListItem(name)).toHaveClass(/active/);
    }
  }

  async openGridTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Grid' }).click();
    await expect(
      this.page.getByRole('tabpanel', { name: 'Grid' }),
    ).toBeVisible();
  }

  async selectGridItems(names: string[]): Promise<void> {
    const [firstName, ...otherNames] = names;

    if (!firstName) {
      throw new Error('At least one grid item is required.');
    }

    await this.getGridItem(firstName).click();

    for (const name of otherNames) {
      await this.getGridItem(name).click({ modifiers: ['ControlOrMeta'] });
    }
  }

  async expectGridItemsSelected(names: string[]): Promise<void> {
    for (const name of names) {
      await expect(this.getGridItem(name)).toHaveClass(/active/);
    }
  }

  private getListItem(name: string): Locator {
    return this.page
      .locator('#verticalListContainer li')
      .filter({ hasText: name })
      .first();
  }

  private getGridItem(name: string): Locator {
    return this.page
      .locator('#gridContainer li')
      .filter({ hasText: name })
      .first();
  }
}
