import { test } from '@playwright/test';

import { webTableRecord } from '../../src/data/web-table.data';
import { WebTablesPage } from '../../src/pages/web-tables.page';

test.describe('Smoke web tables', () => {
  test('creates and finds a record', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await webTablesPage.goto();
    await webTablesPage.createRecord(webTableRecord);
    await webTablesPage.search(webTableRecord.email);
    await webTablesPage.expectRowToContain(webTableRecord);
  });
});
