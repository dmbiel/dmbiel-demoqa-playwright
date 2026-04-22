import {
  expect,
  type APIResponse,
  type Locator,
  type Page,
} from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class BrokenLinksPage {
  constructor(private readonly page: Page) {}

  private contentArea(): Locator {
    return this.page.locator('.col-12.col-md-6');
  }

  private imageExamples(): Locator {
    return this.contentArea().locator('img');
  }

  private validLink(): Locator {
    return this.contentArea().getByRole('link', {
      name: 'Click Here for Valid Link',
    });
  }

  private brokenLink(): Locator {
    return this.contentArea().getByRole('link', {
      name: 'Click Here for Broken Link',
    });
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/broken');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Broken Links - Images',
      primaryControls: [this.validLink(), this.brokenLink()],
    });
  }

  async expectExampleSectionsVisible(): Promise<void> {
    await expect(
      this.contentArea().getByText('Valid image', { exact: true }),
    ).toBeVisible();
    await expect(
      this.contentArea().getByText('Broken image', { exact: true }),
    ).toBeVisible();
    await expect(
      this.contentArea().getByText('Valid Link', { exact: true }),
    ).toBeVisible();
    await expect(
      this.contentArea().getByText('Broken Link', { exact: true }),
    ).toBeVisible();
    await expect(this.imageExamples()).toHaveCount(2);
  }

  async expectBrokenImageNotRendered(): Promise<void> {
    await expect
      .poll(async () => {
        return this.imageExamples()
          .nth(1)
          .evaluate((image) => {
            const htmlImage = image as HTMLImageElement;

            return {
              complete: htmlImage.complete,
              naturalWidth: htmlImage.naturalWidth,
            };
          });
      })
      .toEqual({
        complete: true,
        naturalWidth: 0,
      });
  }

  async requestValidLink(): Promise<APIResponse> {
    const validLinkHref = await this.validLink().getAttribute('href');

    if (!validLinkHref) {
      throw new Error('Valid link href is not available.');
    }

    return this.page.request.get(validLinkHref, {
      maxRedirects: 5,
    });
  }

  async requestBrokenLink(): Promise<APIResponse> {
    const brokenLinkHref = await this.brokenLink().getAttribute('href');

    if (!brokenLinkHref) {
      throw new Error('Broken link href is not available.');
    }

    return this.page.request.get(brokenLinkHref, {
      maxRedirects: 0,
    });
  }
}
