import { expect, type Locator, type Page } from '@playwright/test';

const blockedRequestTokens = [
  'googlesyndication',
  'doubleclick',
  'google-analytics',
  'adservice',
  'cpmstar',
];

const routedPages = new WeakSet<Page>();
const consoleGuardPages = new WeakSet<Page>();
const criticalConsoleErrors = new WeakMap<Page, string[]>();

const ignoredConsoleErrorPatterns = [
  /favicon/i,
  /googleads/i,
  /googlesyndication/i,
  /doubleclick/i,
  /ERR_BLOCKED_BY_CLIENT/i,
  /Failed to load resource:\s+net::ERR_FAILED/i,
];

const brokenStatePatterns = [
  'Whitelabel Error Page',
  "This page isn't working",
  'HTTP ERROR 500',
  'Application error: a client-side exception has occurred',
];

interface DemoQaContentPageContract {
  heading: RegExp | string;
  primaryControls?: Locator[];
}

interface DemoQaSectionLandingContract {
  sectionName: RegExp | string;
  primaryControls?: Locator[];
}

export async function openDemoQaPage(page: Page, path: string): Promise<void> {
  await blockThirdPartyNoise(page);
  enableConsoleGuard(page);
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await hideDemoQaNoise(page);
}

export async function expectDemoQaHomePageReady(page: Page): Promise<void> {
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('header a img')).toBeVisible();
  await expect(page.locator('.category-cards')).toBeVisible();
  await expectNoBrokenShell(page);
  await expectNoCriticalConsoleErrors(page);
}

export async function expectDemoQaContentPageReady(
  page: Page,
  contract: DemoQaContentPageContract,
): Promise<void> {
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('header a img')).toBeVisible();
  await expect(page.locator('.left-pannel')).toBeVisible();
  if (typeof contract.heading === 'string') {
    await expect(
      page.getByRole('heading', {
        name: contract.heading,
        exact: true,
      }),
    ).toBeVisible();
  } else {
    await expect(
      page.getByRole('heading', { name: contract.heading }),
    ).toBeVisible();
  }
  await expectNoBrokenShell(page);

  for (const primaryControl of contract.primaryControls ?? []) {
    await expect(primaryControl).toBeVisible();
  }

  await expectNoCriticalConsoleErrors(page);
}

export async function expectDemoQaSectionLandingReady(
  page: Page,
  contract: DemoQaSectionLandingContract,
): Promise<void> {
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('header a img')).toBeVisible();
  await expect(page.locator('.left-pannel')).toBeVisible();
  await expect(
    page.getByText(contract.sectionName, { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Please select an item from left to start practice.'),
  ).toBeVisible();
  await expectNoBrokenShell(page);

  for (const primaryControl of contract.primaryControls ?? []) {
    await expect(primaryControl).toBeVisible();
  }

  await expectNoCriticalConsoleErrors(page);
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

function enableConsoleGuard(page: Page): void {
  if (consoleGuardPages.has(page)) {
    return;
  }

  criticalConsoleErrors.set(page, []);

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    const text = message.text().trim();

    if (
      !text ||
      ignoredConsoleErrorPatterns.some((pattern) => pattern.test(text))
    ) {
      return;
    }

    criticalConsoleErrors.get(page)?.push(text);
  });

  page.on('pageerror', (error) => {
    criticalConsoleErrors.get(page)?.push(error.message);
  });

  consoleGuardPages.add(page);
}

async function expectNoBrokenShell(page: Page): Promise<void> {
  const body = page.locator('body');

  for (const brokenStatePattern of brokenStatePatterns) {
    await expect(body).not.toContainText(brokenStatePattern);
  }
}

async function expectNoCriticalConsoleErrors(page: Page): Promise<void> {
  expect(
    criticalConsoleErrors.get(page) ?? [],
    'Expected no critical console or page errors while loading the page.',
  ).toEqual([]);
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
