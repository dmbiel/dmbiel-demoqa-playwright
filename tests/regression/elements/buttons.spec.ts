import { test } from '@playwright/test';

import { ButtonsPage } from '../../../src/pages/buttons.page';

test.describe('Buttons', () => {
  test('shows the dedicated message after a double click', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);

    await buttonsPage.goto();
    await buttonsPage.performDoubleClick();
    await buttonsPage.expectDoubleClickMessage();
  });

  test('shows the dedicated message after a right click', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);

    await buttonsPage.goto();
    await buttonsPage.performRightClick();
    await buttonsPage.expectRightClickMessage();
  });

  test('shows the dedicated message after a dynamic click', async ({
    page,
  }) => {
    const buttonsPage = new ButtonsPage(page);

    await buttonsPage.goto();
    await buttonsPage.performDynamicClick();
    await buttonsPage.expectDynamicClickMessage();
  });
});
