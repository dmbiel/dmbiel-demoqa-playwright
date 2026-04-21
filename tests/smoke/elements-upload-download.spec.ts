import { expect, test } from '@playwright/test';

import { UploadDownloadPage } from '../../src/pages/upload-download.page';

test.describe('Smoke upload and download', () => {
  test('starts a file download from the page', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);

    await uploadDownloadPage.goto();

    const download = await uploadDownloadPage.triggerDownload();

    await expect(download.suggestedFilename()).toBeTruthy();
  });
});
