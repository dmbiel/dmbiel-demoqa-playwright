import { test } from '@playwright/test';

import {
  updatedWebTableRecord,
  webTableRecord,
} from '../../../src/data/web-table.data';
import { WebTablesPage } from '../../../src/pages/web-tables.page';

test.describe('Web Tables', () => {
  test('creates and finds a new record', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await webTablesPage.goto();
    await webTablesPage.createRecord(webTableRecord);
    await webTablesPage.search(webTableRecord.email);
    await webTablesPage.expectRowToContain(webTableRecord);
  });

  test('edits and deletes an existing record', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await webTablesPage.goto();
    await webTablesPage.createRecord(webTableRecord);
    await webTablesPage.updateRecord(webTableRecord.email, updatedWebTableRecord);
    await webTablesPage.search(updatedWebTableRecord.email);
    await webTablesPage.expectRowToContain(updatedWebTableRecord);

    await webTablesPage.deleteRecord(updatedWebTableRecord.email);
    await webTablesPage.expectNoRowsFound();
  });
});
