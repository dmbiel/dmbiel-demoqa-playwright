import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class DatePickerPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/date-picker');
    await expect(
      this.page.getByRole('heading', { name: 'Date Picker' }),
    ).toBeVisible();
  }

  async setDate(dateValue: string): Promise<void> {
    const dateInput = this.page.locator('#datePickerMonthYearInput');

    await dateInput.click();
    await dateInput.press('ControlOrMeta+a');
    await dateInput.fill(dateValue);
    await dateInput.press('Enter');
  }

  async expectDate(dateValue: string): Promise<void> {
    await expect(this.page.locator('#datePickerMonthYearInput')).toHaveValue(
      dateValue,
    );
  }
}
