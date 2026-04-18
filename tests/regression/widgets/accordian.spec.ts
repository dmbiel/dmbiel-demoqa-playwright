import { test } from '@playwright/test';

import { AccordianPage } from '../../../src/pages/accordian.page';

test.describe('Accordian', () => {
  test('opens the first section by default and keeps others collapsed', async ({
    page,
  }) => {
    const accordianPage = new AccordianPage(page);

    await accordianPage.goto();
    await accordianPage.expectFirstSectionVisible();
    await accordianPage.expectSecondSectionCollapsed();
    await accordianPage.expectThirdSectionCollapsed();
  });

  test('collapses previously active sections when switching panels', async ({
    page,
  }) => {
    const accordianPage = new AccordianPage(page);

    await accordianPage.goto();
    await accordianPage.openSecondSection();
    await accordianPage.expectSecondSectionVisible();
    await accordianPage.expectFirstSectionCollapsed();
    await accordianPage.expectThirdSectionCollapsed();

    await accordianPage.openThirdSection();
    await accordianPage.expectThirdSectionVisible();
    await accordianPage.expectFirstSectionCollapsed();
    await accordianPage.expectSecondSectionCollapsed();
  });
});
