import { test } from '@playwright/test';

import { ButtonsPage } from '../../src/pages/buttons.page';

test.describe('Smoke buttons', () => {
  test('executes double, right, and dynamic click actions', async ({
    page,
  }) => {
    const buttonsPage = new ButtonsPage(page);

    await buttonsPage.goto();
    await buttonsPage.performDoubleClick();
    await buttonsPage.performRightClick();
    await buttonsPage.performDynamicClick();
    await buttonsPage.expectActionMessages();
  });
});
