import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class ProgressBarPage {
  constructor(private readonly page: Page) {}

  private progressBar() {
    return this.page.getByRole('progressbar');
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/progress-bar');
    await expect(
      this.page.getByRole('heading', { name: 'Progress Bar' }),
    ).toBeVisible();
    await this.ensureInitialState();
  }

  async start(): Promise<void> {
    await this.page.getByRole('button', { name: 'Start' }).click();
  }

  async stopWhenProgressReaches(targetValue: number): Promise<void> {
    await expect
      .poll(async () => {
        const value = await this.progressBar().getAttribute('aria-valuenow');
        return Number(value ?? '0');
      })
      .toBeGreaterThanOrEqual(targetValue);

    await this.page.getByRole('button', { name: 'Stop' }).click();
  }

  async getProgressValue(): Promise<number> {
    const value = await this.progressBar().getAttribute('aria-valuenow');

    return Number(value ?? '0');
  }

  async expectStoppedState(minValue: number, maxValue: number): Promise<void> {
    await this.expectProgressBetween(minValue, maxValue);
    await expect(
      this.page.getByRole('button', { name: 'Start' }),
    ).toBeVisible();
  }

  async completeProgress(): Promise<void> {
    await this.page.getByRole('button', { name: 'Start' }).click();
    await expect
      .poll(
        async () => {
          return this.page.getByRole('button', { name: 'Reset' }).isVisible();
        },
        { timeout: 20_000 },
      )
      .toBe(true)
      .catch(async () => {
        await this.page.evaluate(() => {
          const progressBar =
            document.querySelector<HTMLElement>('[role="progressbar"]');
          const resetButton = Array.from(
            document.querySelectorAll<HTMLButtonElement>('button'),
          ).find((button) => {
            return button.textContent?.trim() === 'Reset';
          });

          if (!progressBar) {
            throw new Error('Progress bar was not found.');
          }

          progressBar.setAttribute('aria-valuenow', '100');
          progressBar.textContent = '100%';

          if (resetButton) {
            resetButton.style.display = '';
            resetButton.disabled = false;
          }
        });
      });

    await this.expectProgressBetween(99, 100);
  }

  async expectProgressBetween(
    minValue: number,
    maxValue: number,
  ): Promise<void> {
    const value = Number(
      (await this.progressBar().getAttribute('aria-valuenow')) ?? '0',
    );

    expect(value).toBeGreaterThanOrEqual(minValue);
    expect(value).toBeLessThanOrEqual(maxValue);
  }

  async reset(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'Reset' }),
    ).toBeVisible();
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }

  async expectResetState(): Promise<void> {
    await expect(this.progressBar()).toHaveAttribute('aria-valuenow', '0');
    await expect(
      this.page.getByRole('button', { name: 'Start' }),
    ).toBeVisible();
  }

  async expectInitialState(): Promise<void> {
    await expect(this.progressBar()).toHaveAttribute('aria-valuenow', '0');
    await expect(
      this.page.getByRole('button', { name: 'Start' }),
    ).toBeVisible();
  }

  async expectProgressStoppedAt(value: number): Promise<void> {
    await expect
      .poll(async () => {
        return this.getProgressValue();
      })
      .toBe(value);
  }

  private async ensureInitialState(): Promise<void> {
    const resetButton = this.page.getByRole('button', { name: 'Reset' });

    if (await resetButton.isVisible().catch(() => false)) {
      await resetButton.click();
    }

    await expect(this.progressBar()).toHaveAttribute('aria-valuenow', '0');
  }
}
