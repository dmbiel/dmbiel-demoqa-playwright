import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class ButtonsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/buttons');
    await expect(
      this.page.getByRole('heading', { name: 'Buttons' }),
    ).toBeVisible();
  }

  async performDoubleClick(): Promise<void> {
    await this.page.locator('#doubleClickBtn').dblclick();
  }

  async performRightClick(): Promise<void> {
    await this.page.locator('#rightClickBtn').click({ button: 'right' });
  }

  async performDynamicClick(): Promise<void> {
    await this.page.getByRole('button', { name: 'Click Me' }).last().click();
  }

  async expectActionMessages(): Promise<void> {
    await expect(this.page.locator('#doubleClickMessage')).toHaveText(
      'You have done a double click',
    );
    await expect(this.page.locator('#rightClickMessage')).toHaveText(
      'You have done a right click',
    );
    await expect(this.page.locator('#dynamicClickMessage')).toHaveText(
      'You have done a dynamic click',
    );
  }
}
