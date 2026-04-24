import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class ModalDialogsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/modal-dialogs');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Modal Dialogs',
      primaryControls: [this.page.locator('#showSmallModal')],
    });
  }

  async openSmallModal(): Promise<void> {
    await this.page.locator('#showSmallModal').click();
  }

  async expectSmallModalVisible(): Promise<void> {
    const modal = this.page.locator('.modal-content');

    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-title')).toHaveText('Small Modal');
    await expect(modal.locator('.modal-body')).toContainText(
      'This is a small modal.',
    );
  }

  async closeSmallModal(): Promise<void> {
    await this.page.locator('#closeSmallModal').click();
  }

  async expectModalClosed(): Promise<void> {
    await expect(this.page.locator('.modal-content')).not.toBeVisible();
  }
}
