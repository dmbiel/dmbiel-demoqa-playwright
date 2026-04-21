import { expect, type Download, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class UploadDownloadPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/upload-download');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Upload and Download',
      primaryControls: [
        this.page.locator('#downloadButton'),
        this.page.locator('#uploadFile'),
      ],
    });
  }

  async triggerDownload(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator('#downloadButton').click(),
    ]);

    return download;
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.page.locator('#uploadFile').setInputFiles(filePath);
  }

  async expectUploadedFileName(fileName: string): Promise<void> {
    await expect(this.page.locator('#uploadedFilePath')).toContainText(
      fileName,
    );
  }
}
