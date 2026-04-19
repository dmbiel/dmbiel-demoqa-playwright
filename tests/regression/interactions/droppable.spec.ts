import { test } from '@playwright/test';

import { DroppablePage } from '../../../src/pages/droppable.page';

test.describe('Drag and Drop', () => {
  test('moves the draggable element into the simple drop zone', async ({
    page,
  }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.dragToDropZone();
    await droppablePage.expectSuccessfulDrop();
  });

  test('accepts only the acceptable draggable', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.openAcceptTab();
    await droppablePage.dragAcceptableToDropZone();
    await droppablePage.expectAcceptableDropSucceeded();
  });

  test('rejects the not acceptable draggable', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.openAcceptTab();
    await droppablePage.dragNotAcceptableToDropZone();
    await droppablePage.expectNotAcceptableDropRejected();
  });

  test('distinguishes non-greedy and greedy inner drops', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.openPreventPropogationTab();
    await droppablePage.dropOnNotGreedyInnerBox();
    await droppablePage.expectNotGreedyInnerDropPropagates();

    await droppablePage.goto();
    await droppablePage.openPreventPropogationTab();
    await droppablePage.dropOnGreedyInnerBox();
    await droppablePage.expectGreedyInnerDropDoesNotPropagate();
  });

  test('reverts only the revertable draggable', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.goto();
    await droppablePage.openRevertDraggableTab();

    const initialRevertablePosition =
      await droppablePage.getRevertablePosition();
    await droppablePage.dropRevertableInZone();
    await droppablePage.expectRevertableReturnsToStart(
      initialRevertablePosition,
    );

    const initialNotRevertablePosition =
      await droppablePage.getNotRevertablePosition();
    await droppablePage.dropNotRevertableInZone();
    await droppablePage.expectNotRevertableStaysInDropZone(
      initialNotRevertablePosition,
    );
  });
});
