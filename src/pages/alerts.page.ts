import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

type DialogBucket = 'alerts' | 'confirms' | 'prompts';

export class AlertsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/alerts');
    await expect(
      this.page.getByRole('heading', { name: 'Alerts' }),
    ).toBeVisible();
    await this.installDialogMocks();
  }

  async triggerImmediateAlert(): Promise<string> {
    await this.page.locator('#alertButton').click();
    return this.waitForLastDialogMessage('alerts');
  }

  async triggerDelayedAlert(): Promise<string> {
    await this.page.locator('#timerAlertButton').click();
    return this.waitForLastDialogMessage('alerts');
  }

  async confirmAction(): Promise<string> {
    await this.setDialogMockOptions({ confirmValue: true });
    await this.page.locator('#confirmButton').click();
    return this.waitForLastDialogMessage('confirms');
  }

  async fillPrompt(value: string): Promise<string> {
    await this.setDialogMockOptions({ promptValue: value });
    await this.page.locator('#promtButton').click();
    return this.waitForLastDialogMessage('prompts');
  }

  async expectConfirmResult(result: string): Promise<void> {
    await expect(this.page.locator('#confirmResult')).toHaveText(result);
  }

  async expectPromptResult(result: string): Promise<void> {
    await expect(this.page.locator('#promptResult')).toHaveText(result);
  }

  private async installDialogMocks(): Promise<void> {
    await this.page.evaluate(() => {
      const win = window as typeof window & {
        __demoQaDialogState?: {
          alerts: string[];
          confirms: string[];
          prompts: string[];
          confirmValue: boolean;
          promptValue: string;
        };
      };

      if (win.__demoQaDialogState) {
        return;
      }

      win.__demoQaDialogState = {
        alerts: [],
        confirms: [],
        prompts: [],
        confirmValue: true,
        promptValue: '',
      };

      window.alert = (message?: string) => {
        win.__demoQaDialogState?.alerts.push(String(message ?? ''));
      };

      window.confirm = (message?: string) => {
        win.__demoQaDialogState?.confirms.push(String(message ?? ''));
        return win.__demoQaDialogState?.confirmValue ?? true;
      };

      window.prompt = (message?: string) => {
        win.__demoQaDialogState?.prompts.push(String(message ?? ''));
        return win.__demoQaDialogState?.promptValue ?? '';
      };
    });
  }

  private async setDialogMockOptions(options: {
    confirmValue?: boolean;
    promptValue?: string;
  }): Promise<void> {
    await this.page.evaluate(
      (value) => {
        const win = window as typeof window & {
          __demoQaDialogState?: {
            alerts: string[];
            confirms: string[];
            prompts: string[];
            confirmValue: boolean;
            promptValue: string;
          };
        };

        if (!win.__demoQaDialogState) {
          return;
        }

        if (typeof value.confirmValue === 'boolean') {
          win.__demoQaDialogState.confirmValue = value.confirmValue;
        }

        if (typeof value.promptValue === 'string') {
          win.__demoQaDialogState.promptValue = value.promptValue;
        }
      },
      { ...options },
    );
  }

  private async waitForLastDialogMessage(
    bucket: DialogBucket,
  ): Promise<string> {
    await this.page.waitForFunction((currentBucket) => {
      const win = window as typeof window & {
        __demoQaDialogState?: Record<string, string[]>;
      };

      return (win.__demoQaDialogState?.[currentBucket]?.length ?? 0) > 0;
    }, bucket);

    return this.page.evaluate((currentBucket) => {
      const win = window as typeof window & {
        __demoQaDialogState?: Record<string, string[]>;
      };
      const values = win.__demoQaDialogState?.[currentBucket] ?? [];

      return values.at(-1) ?? '';
    }, bucket);
  }
}
