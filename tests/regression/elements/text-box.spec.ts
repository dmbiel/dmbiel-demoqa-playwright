import { test } from '@playwright/test';

import { TextBoxPage } from '../../../src/pages/text-box.page';

test.describe('Text Box', () => {
  test('submits the form with a complete set of values', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    const textBoxData = {
      fullName: 'Daria Bielawska',
      email: 'daria.bielawska@example.com',
      currentAddress: 'Warsaw, Poland',
      permanentAddress: 'Krakow, Poland',
    };

    await textBoxPage.goto();
    await textBoxPage.fillAndSubmit(textBoxData);
    await textBoxPage.expectSubmittedValues(textBoxData);
  });

  test('does not submit when email format is invalid', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);

    await textBoxPage.goto();
    await textBoxPage.fillInvalidEmailAndSubmit('not-an-email');
    await textBoxPage.expectNoSubmissionOutput();
    await textBoxPage.expectEmailFieldMarkedInvalid();
  });
});
