import { expect, test } from '@playwright/test';

import { SortablePage } from '../../src/pages/sortable.page';

test.describe('Smoke sortable', () => {
  test('reorders list items with drag and drop', async ({ page }) => {
    const sortablePage = new SortablePage(page);

    await sortablePage.goto();

    const initialOrder = await sortablePage.getListOrder();
    await expect(initialOrder.length).toBeGreaterThanOrEqual(3);
    const firstItem = initialOrder[0];

    if (!firstItem) {
      throw new Error('Sortable list did not render any items.');
    }

    await sortablePage.moveFirstItemAfterThird();
    await sortablePage.expectFirstItemChanged(firstItem);
  });
});
