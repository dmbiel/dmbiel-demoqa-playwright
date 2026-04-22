import { test } from '@playwright/test';

import { practiceFormSubmission } from '../../src/data/practice-form.data';
import { PracticeFormPage } from '../../src/pages/practice-form.page';

test.describe('Smoke practice form', () => {
  test('submits the student registration form happy path', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);

    await practiceFormPage.goto();
    await practiceFormPage.fillForm(practiceFormSubmission);
    await practiceFormPage.submit();
    await practiceFormPage.expectSuccessfulSubmission(practiceFormSubmission);
  });
});
