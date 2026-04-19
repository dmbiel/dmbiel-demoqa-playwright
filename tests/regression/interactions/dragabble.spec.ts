import { test } from '@playwright/test';

import { DragabblePage } from '../../../src/pages/dragabble.page';

test.describe('Dragabble', () => {
  test('moves the simple drag box to a new position', async ({ page }) => {
    const dragabblePage = new DragabblePage(page);

    await dragabblePage.goto();

    const initialPosition = await dragabblePage.getDragBoxPosition();
    await dragabblePage.dragBoxBy(80, 50);
    await dragabblePage.expectDragBoxMoved(initialPosition);
  });

  test('restricts drag movement to a single axis when configured', async ({
    page,
  }) => {
    const dragabblePage = new DragabblePage(page);

    await dragabblePage.goto();
    await dragabblePage.openAxisRestrictedTab();

    const initialOnlyXPosition = await dragabblePage.getOnlyXPosition();
    await dragabblePage.dragOnlyXBoxBy(80, 50);
    await dragabblePage.expectOnlyXChanged(initialOnlyXPosition);

    const initialOnlyYPosition = await dragabblePage.getOnlyYPosition();
    await dragabblePage.dragOnlyYBoxBy(80, 50);
    await dragabblePage.expectOnlyYChanged(initialOnlyYPosition);
  });

  test('keeps the draggable element moving inside its container', async ({
    page,
  }) => {
    const dragabblePage = new DragabblePage(page);

    await dragabblePage.goto();
    await dragabblePage.openContainerRestrictedTab();

    const initialPosition =
      await dragabblePage.getContainerRestrictedPosition();
    await dragabblePage.dragContainerRestrictedBoxBy(70, 40);
    await dragabblePage.expectContainerRestrictedBoxMoved(initialPosition);
  });

  test('moves the cursor style draggable box', async ({ page }) => {
    const dragabblePage = new DragabblePage(page);

    await dragabblePage.goto();
    await dragabblePage.openCursorStyleTab();

    const initialPosition = await dragabblePage.getCursorCenteredPosition();
    await dragabblePage.dragCursorCenteredBoxBy(90, 60);
    await dragabblePage.expectCursorCenteredBoxMoved(initialPosition);
  });
});
