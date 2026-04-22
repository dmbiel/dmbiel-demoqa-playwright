import { expect, test } from '@playwright/test';

import { SortablePage } from '../../../src/pages/sortable.page';

test.describe('Sortable', () => {
  test('reorders the list widget and keeps the moved item in the expected slot', async ({
    page,
  }) => {
    const sortablePage = new SortablePage(page);

    await sortablePage.goto();

    const initialOrder = await sortablePage.getListOrder();
    await expect(initialOrder.length).toBeGreaterThanOrEqual(4);

    const [firstItem, secondItem, thirdItem, fourthItem] = initialOrder;

    if (!firstItem || !secondItem || !thirdItem || !fourthItem) {
      throw new Error('Sortable list did not render the expected items.');
    }

    await sortablePage.moveFirstItemAfterThird();
    await sortablePage.expectListOrder([
      secondItem,
      thirdItem,
      firstItem,
      fourthItem,
      ...initialOrder.slice(4),
    ]);
  });

  test('reorders items in the grid widget', async ({ page }) => {
    const sortablePage = new SortablePage(page);

    await sortablePage.goto();
    await sortablePage.openGridTab();

    const initialOrder = await sortablePage.getGridOrder();
    await expect(initialOrder.length).toBeGreaterThanOrEqual(5);

    const [firstItem, secondItem, thirdItem, fourthItem, fifthItem] =
      initialOrder;

    if (!firstItem || !secondItem || !thirdItem || !fourthItem || !fifthItem) {
      throw new Error('Sortable grid did not render the expected items.');
    }

    await sortablePage.moveFirstGridItemAfterFourth();

    const currentOrder = await sortablePage.getGridOrder();
    expect(currentOrder).toHaveLength(initialOrder.length);
    expect(currentOrder).not.toEqual(initialOrder);
    expect(currentOrder[0]).not.toBe(firstItem);
    expect(currentOrder.indexOf(firstItem)).toBeGreaterThan(0);
    expect([...currentOrder].sort()).toEqual([...initialOrder].sort());
  });
});
