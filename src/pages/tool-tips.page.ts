import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class ToolTipsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/tool-tips');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Tool Tips',
      primaryControls: [this.page.locator('#toolTipButton')],
    });
  }

  async hoverOverButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Hover me to see' }).hover();
  }

  async expectButtonTooltip(): Promise<void> {
    await expect(
      this.page.getByText('You hovered over the Button'),
    ).toBeVisible();
  }

  async hoverOverTextField(): Promise<void> {
    await this.page.locator('#toolTipTextField').hover();
  }

  async expectTextFieldTooltip(): Promise<void> {
    await expect(
      this.page.getByText('You hovered over the text field'),
    ).toBeVisible();
  }

  async hoverOverContraryLink(): Promise<void> {
    await this.page.getByText('Contrary', { exact: true }).hover();
  }

  async expectContraryTooltip(): Promise<void> {
    await expect(
      this.page.getByText('You hovered over the Contrary'),
    ).toBeVisible();
  }

  async hoverOverSectionNumberLink(): Promise<void> {
    await this.page.getByText('1.10.32', { exact: true }).hover();
  }

  async expectSectionNumberTooltip(): Promise<void> {
    await expect(
      this.page.getByText('You hovered over the 1.10.32'),
    ).toBeVisible();
  }
}
