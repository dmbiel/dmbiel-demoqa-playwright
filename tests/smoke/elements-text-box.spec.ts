import { test } from '@playwright/test';

import { TextBoxPage } from '../../src/pages/text-box.page';

test.describe('Smoke text box', () => {
  test('submits the text box form successfully', async ({ page }) => {
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
});
