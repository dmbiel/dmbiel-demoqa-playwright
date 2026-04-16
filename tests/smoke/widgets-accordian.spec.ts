import { test } from '@playwright/test';

import { AccordianPage } from '../../src/pages/accordian.page';

test.describe('Smoke accordian', () => {
  test('switches between available accordian sections', async ({ page }) => {
    const accordianPage = new AccordianPage(page);

    await accordianPage.goto();
    await accordianPage.expectFirstSectionVisible();

    await accordianPage.openSecondSection();
    await accordianPage.expectSecondSectionVisible();

    await accordianPage.openThirdSection();
    await accordianPage.expectThirdSectionVisible();
  });
});
