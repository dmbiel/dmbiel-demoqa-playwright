import { test } from '@playwright/test';

import { DatePickerPage } from '../../../src/pages/date-picker.page';

test.describe('Date Picker', () => {
  test('selects a date from the calendar widget', async ({ page }) => {
    const datePickerPage = new DatePickerPage(page);

    await datePickerPage.goto();
    await datePickerPage.selectDateFromCalendar('May', '2027', '20');
    await datePickerPage.expectDate('05/20/2027');
  });

  test('sets a date and time in the combined picker input', async ({
    page,
  }) => {
    const datePickerPage = new DatePickerPage(page);
    const targetDateTime = 'May 21, 2027 4:30 PM';

    await datePickerPage.goto();
    await datePickerPage.setDateAndTime(targetDateTime);
    await datePickerPage.expectDateAndTime(targetDateTime);
  });
});
