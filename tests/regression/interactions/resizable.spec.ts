import { test } from '@playwright/test';

import { ResizablePage } from '../../../src/pages/resizable.page';

test.describe('Resizable', () => {
  test('resizes the free box with the drag handle', async ({ page }) => {
    const resizablePage = new ResizablePage(page);

    await resizablePage.goto();

    const initialSize = await resizablePage.getFreeBoxSize();
    await resizablePage.resizeFreeBoxBy(80, 60);
    await resizablePage.expectFreeBoxGrew(initialSize);
  });

  test('keeps the constrained box within its growth limits', async ({
    page,
  }) => {
    const resizablePage = new ResizablePage(page);

    await resizablePage.goto();

    const initialSize = await resizablePage.getConstrainedBoxSize();
    await resizablePage.resizeConstrainedBoxBy(500, 500);
    await resizablePage.expectConstrainedBoxReachedGrowthLimit(
      initialSize,
      500,
      300,
    );
    await resizablePage.expectConstrainedBoxWithinBounds(500, 300);
  });
});
