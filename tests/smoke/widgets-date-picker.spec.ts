import { test } from '@playwright/test';

import { DatePickerPage } from '../../src/pages/date-picker.page';

test.describe('Smoke date picker', () => {
  test('sets a date in the basic date picker input', async ({ page }) => {
    const datePickerPage = new DatePickerPage(page);
    const targetDate = '04/15/2026';

    await datePickerPage.goto();
    await datePickerPage.setDate(targetDate);
    await datePickerPage.expectDate(targetDate);
  });
});
