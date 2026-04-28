import { test } from '@playwright/test';

import { ModalDialogsPage } from '../../../src/pages/modal-dialogs.page';

test.describe('Modal Dialogs', () => {
  test('opens and closes the small modal dialog', async ({ page }) => {
    const modalDialogsPage = new ModalDialogsPage(page);

    await modalDialogsPage.goto();
    await modalDialogsPage.openSmallModal();
    await modalDialogsPage.expectSmallModalVisible();
    await modalDialogsPage.closeSmallModal();
    await modalDialogsPage.expectModalClosed();
  });

  test('opens and closes the large modal dialog', async ({ page }) => {
    const modalDialogsPage = new ModalDialogsPage(page);

    await modalDialogsPage.goto();
    await modalDialogsPage.openLargeModal();
    await modalDialogsPage.expectLargeModalVisible();
    await modalDialogsPage.closeLargeModal();
    await modalDialogsPage.expectModalClosed();
  });
});
