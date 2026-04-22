import { expect, test } from '@playwright/test';

import { UploadDownloadPage } from '../../../src/pages/upload-download.page';

const uploadFixturePath = 'tests/fixtures/upload/avatar.txt';

test.describe('Upload and Download', () => {
  test('downloads the sample file with the expected filename', async ({
    page,
  }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);

    await uploadDownloadPage.goto();

    const download = await uploadDownloadPage.triggerDownload();

    await expect(download.suggestedFilename()).toBe('sampleFile.jpeg');
  });

  test('uploads a file and shows the uploaded filename', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);

    await uploadDownloadPage.goto();
    await uploadDownloadPage.uploadFile(uploadFixturePath);
    await uploadDownloadPage.expectUploadedFileName('avatar.txt');
  });
});
