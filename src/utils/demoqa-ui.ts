import type { Page } from '@playwright/test';

const blockedRequestTokens = [
  'googlesyndication',
  'doubleclick',
  'google-analytics',
  'adservice',
  'cpmstar',
];

const routedPages = new WeakSet<Page>();

export async function openDemoQaPage(page: Page, path: string): Promise<void> {
  await blockThirdPartyNoise(page);
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await hideDemoQaNoise(page);
}

async function blockThirdPartyNoise(page: Page): Promise<void> {
  if (routedPages.has(page)) {
    return;
  }

  await page.route('**/*', async (route) => {
    const requestUrl = route.request().url();

    if (blockedRequestTokens.some((token) => requestUrl.includes(token))) {
      await route.abort();
      return;
    }

    await route.continue();
  });

  routedPages.add(page);
}

export async function hideDemoQaNoise(page: Page): Promise<void> {
  await page
    .addStyleTag({
      content: `
        #fixedban,
        footer,
        .Advertisement,
        #RightSide_Advertisement,
        [id*="google_ads"],
        iframe[src*="googleads"],
        iframe[id*="google_ads_iframe"] {
          display: none !important;
          visibility: hidden !important;
        }
      `,
    })
    .catch(() => {});

  await page
    .evaluate(() => {
      const selectors = [
        '#fixedban',
        'footer',
        '.Advertisement',
        '#RightSide_Advertisement',
      ];

      selectors.forEach((selector) => {
        document
          .querySelectorAll(selector)
          .forEach((element) => element.remove());
      });
    })
    .catch(() => {});
}
