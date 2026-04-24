import { test } from '@playwright/test';

import { ModalDialogsPage } from '../../src/pages/modal-dialogs.page';

test.describe('Smoke modal dialogs', () => {
  test('opens and closes the small modal dialog', async ({ page }) => {
    const modalDialogsPage = new ModalDialogsPage(page);

    await modalDialogsPage.goto();
    await modalDialogsPage.openSmallModal();
    await modalDialogsPage.expectSmallModalVisible();
    await modalDialogsPage.closeSmallModal();
    await modalDialogsPage.expectModalClosed();
  });
});
