import { test } from '@playwright/test';

import { DroppablePage } from '../../src/pages/droppable.page';

test.describe('Smoke droppable', () => {
  test('drops the draggable element into the simple target', async ({
    page,
  }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.dragToDropZone();
    await droppablePage.expectSuccessfulDrop();
  });
});
