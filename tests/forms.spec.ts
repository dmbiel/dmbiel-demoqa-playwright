import { test } from '@playwright/test';

import { practiceFormSubmission } from '../src/data/practice-form.data';
import { PracticeFormPage } from '../src/pages/practice-form.page';

test.describe('Practice Form', () => {
  test('submits a completed student registration form', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);

    await practiceFormPage.goto();
    await practiceFormPage.fillForm(practiceFormSubmission);
    await practiceFormPage.submit();
    await practiceFormPage.expectSuccessfulSubmission(practiceFormSubmission);
  });
});
