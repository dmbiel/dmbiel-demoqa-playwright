import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class ToolTipsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/tool-tips');
    await expect(
      this.page.getByRole('heading', { name: 'Tool Tips' }),
    ).toBeVisible();
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
}
