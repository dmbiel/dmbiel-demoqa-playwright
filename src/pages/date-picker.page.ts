import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class DatePickerPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/date-picker');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Date Picker',
      primaryControls: [this.page.locator('#datePickerMonthYearInput')],
    });
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

  async selectDateFromCalendar(
    monthLabel: string,
    yearValue: string,
    dayLabel: string,
  ): Promise<void> {
    await this.page.locator('#datePickerMonthYearInput').click();
    await this.page.locator('.react-datepicker__month-select').selectOption({
      label: monthLabel,
    });
    await this.page
      .locator('.react-datepicker__year-select')
      .selectOption(yearValue);
    await this.page
      .locator(
        `.react-datepicker__day:not(.react-datepicker__day--outside-month)`,
      )
      .filter({ hasText: dayLabel })
      .first()
      .click();
  }

  async setDateAndTime(dateTimeValue: string): Promise<void> {
    const dateTimeInput = this.page.locator('#dateAndTimePickerInput');

    await dateTimeInput.click();
    await dateTimeInput.press('ControlOrMeta+a');
    await dateTimeInput.fill(dateTimeValue);
    await dateTimeInput.press('Enter');
  }

  async expectDateAndTime(dateTimeValue: string): Promise<void> {
    await expect(this.page.locator('#dateAndTimePickerInput')).toHaveValue(
      dateTimeValue,
    );
  }
}
