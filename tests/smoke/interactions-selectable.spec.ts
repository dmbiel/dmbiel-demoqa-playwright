import { test } from '@playwright/test';

import { SelectablePage } from '../../src/pages/selectable.page';

test.describe('Smoke selectable', () => {
  test('selects an item from the list widget', async ({ page }) => {
    const selectablePage = new SelectablePage(page);

    await selectablePage.goto();
    await selectablePage.selectListItem('Cras justo odio');
    await selectablePage.expectListItemSelected('Cras justo odio');
  });
});
