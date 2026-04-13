import { test } from '@playwright/test';

import { DroppablePage } from '../src/pages/droppable.page';

test.describe('Drag and Drop', () => {
  test('moves the draggable element into the drop zone', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.dragToDropZone();
    await droppablePage.expectSuccessfulDrop();
  });
});
