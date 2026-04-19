import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class MenuPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/menu');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Menu',
      primaryControls: [this.page.getByText('Main Item 1', { exact: true })],
    });
  }

  async hoverMainItem2(): Promise<void> {
    await this.page.getByText('Main Item 2', { exact: true }).hover();
  }

  async expectMainItemsVisible(): Promise<void> {
    await expect(
      this.page.getByText('Main Item 1', { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText('Main Item 2', { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText('Main Item 3', { exact: true }),
    ).toBeVisible();
  }

  async expectSubMenuHidden(): Promise<void> {
    await expect(
      this.page.getByText('SUB SUB LIST »', { exact: true }),
    ).not.toBeVisible();
  }

  async expectNestedItemsHidden(): Promise<void> {
    await expect(
      this.page.getByText('Sub Sub Item 1', { exact: true }),
    ).not.toBeVisible();
    await expect(
      this.page.getByText('Sub Sub Item 2', { exact: true }),
    ).not.toBeVisible();
  }

  async expectSubMenuVisible(): Promise<void> {
    await expect(
      this.page.getByText('SUB SUB LIST »', { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Sub Item' }).first(),
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Sub Item' }).nth(1),
    ).toBeVisible();
  }

  async hoverSubSubList(): Promise<void> {
    await this.page.getByText('SUB SUB LIST »', { exact: true }).hover();
  }

  async expectNestedItemsVisible(): Promise<void> {
    await expect(
      this.page.getByText('Sub Sub Item 1', { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText('Sub Sub Item 2', { exact: true }),
    ).toBeVisible();
  }
}
