import { test } from '@playwright/test';

import { ResizablePage } from '../../src/pages/resizable.page';

test.describe('Smoke resizable', () => {
  test('resizes the free box with the drag handle', async ({ page }) => {
    const resizablePage = new ResizablePage(page);

    await resizablePage.goto();

    const initialSize = await resizablePage.getFreeBoxSize();
    await resizablePage.resizeFreeBoxBy(60, 40);
    await resizablePage.expectFreeBoxGrew(initialSize);
  });
});
