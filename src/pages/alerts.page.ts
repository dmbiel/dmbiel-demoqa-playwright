import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class AlertsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/alerts');
    await expect(
      this.page.getByRole('heading', { name: 'Alerts' }),
    ).toBeVisible();
  }

  async triggerImmediateAlert(): Promise<string> {
    return this.acceptDialogAfterClick('#alertButton');
  }

  async triggerDelayedAlert(): Promise<string> {
    return this.acceptDialogAfterClick('#timerAlertButton');
  }

  async confirmAction(): Promise<string> {
    return this.acceptDialogAfterClick('#confirmButton');
  }

  async fillPrompt(value: string): Promise<string> {
    return this.acceptDialogAfterClick('#promtButton', value);
  }

  async expectConfirmResult(result: string): Promise<void> {
    await expect(this.page.locator('#confirmResult')).toHaveText(result);
  }

  async expectPromptResult(result: string): Promise<void> {
    await expect(this.page.locator('#promptResult')).toHaveText(result);
  }

  private async acceptDialogAfterClick(
    selector: string,
    promptText?: string,
  ): Promise<string> {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.locator(selector).click(),
    ]);
    const dialogMessage = dialog.message();
    await dialog.accept(promptText);

    return dialogMessage;
  }
}
