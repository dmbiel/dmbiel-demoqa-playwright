import { test } from '@playwright/test';

import { DragabblePage } from '../../src/pages/dragabble.page';

test.describe('Smoke dragabble', () => {
  test('moves the simple drag box to a new position', async ({ page }) => {
    const dragabblePage = new DragabblePage(page);

    await dragabblePage.goto();

    const initialPosition = await dragabblePage.getDragBoxPosition();
    await dragabblePage.dragBoxBy(80, 50);
    await dragabblePage.expectDragBoxMoved(initialPosition);
  });
});
