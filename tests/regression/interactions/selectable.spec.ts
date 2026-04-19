import { test } from '@playwright/test';

import { SelectablePage } from '../../../src/pages/selectable.page';

test.describe('Selectable', () => {
  test('keeps multiple selected items active in the list widget', async ({
    page,
  }) => {
    const selectablePage = new SelectablePage(page);

    await selectablePage.goto();
    await selectablePage.selectListItem('Cras justo odio');
    await selectablePage.selectListItem('Dapibus ac facilisis in');
    await selectablePage.expectListItemsSelected([
      'Cras justo odio',
      'Dapibus ac facilisis in',
    ]);
  });

  test('supports multi-selection in the grid widget', async ({ page }) => {
    const selectablePage = new SelectablePage(page);

    await selectablePage.goto();
    await selectablePage.openGridTab();
    await selectablePage.selectGridItems(['One', 'Two', 'Three']);
    await selectablePage.expectGridItemsSelected(['One', 'Two', 'Three']);
  });
});
