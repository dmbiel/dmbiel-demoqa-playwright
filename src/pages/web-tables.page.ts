import { expect, type Locator, type Page } from '@playwright/test';

import type { WebTableRecord } from '../data/web-table.data';
import { openDemoQaPage } from '../utils/demoqa-ui';

export class WebTablesPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/webtables');
    await expect(
      this.page.getByRole('heading', { name: 'Web Tables' }),
    ).toBeVisible();
  }

  async openRegistrationForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.locator('.modal-title')).toHaveText('Registration Form');
  }

  async createRecord(record: WebTableRecord): Promise<void> {
    await this.openRegistrationForm();
    await this.fillRegistrationForm(record);
    await this.submitRegistrationForm();
  }

  async updateRecord(
    email: string,
    updatedRecord: WebTableRecord,
  ): Promise<void> {
    await this.search(email);
    await this.getRowByEmail(email).getByTitle('Edit').click();
    await this.fillRegistrationForm(updatedRecord);
    await this.submitRegistrationForm();
  }

  async deleteRecord(email: string): Promise<void> {
    await this.search(email);
    await this.getRowByEmail(email).getByTitle('Delete').click();
  }

  async search(value: string): Promise<void> {
    await this.page.getByPlaceholder('Type to search').fill(value);
  }

  async expectRowToContain(record: WebTableRecord): Promise<void> {
    const row = this.getRowByEmail(record.email);

    await expect(row).toContainText(record.firstName);
    await expect(row).toContainText(record.lastName);
    await expect(row).toContainText(String(record.age));
    await expect(row).toContainText(record.email);
    await expect(row).toContainText(String(record.salary));
    await expect(row).toContainText(record.department);
  }

  async expectNoRowsFound(): Promise<void> {
    await expect(this.page.getByText('No rows found')).toBeVisible();
  }

  private getRowByEmail(email: string): Locator {
    return this.page.locator('.rt-tr-group').filter({
      has: this.page.getByText(email, { exact: true }),
    });
  }

  private async fillRegistrationForm(record: WebTableRecord): Promise<void> {
    await this.page.locator('#firstName').fill(record.firstName);
    await this.page.locator('#lastName').fill(record.lastName);
    await this.page.locator('#userEmail').fill(record.email);
    await this.page.locator('#age').fill(String(record.age));
    await this.page.locator('#salary').fill(String(record.salary));
    await this.page.locator('#department').fill(record.department);
  }

  private async submitRegistrationForm(): Promise<void> {
    await this.page.locator('#submit').click();
  }
}
