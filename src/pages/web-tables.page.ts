import { expect, type Locator, type Page } from '@playwright/test';

import type { WebTableRecord } from '../data/web-table.data';
import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class WebTablesPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/webtables');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Web Tables',
      primaryControls: [this.page.locator('#addNewRecordButton')],
    });
  }

  async openRegistrationForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.locator('.modal-title')).toHaveText(
      'Registration Form',
    );
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
    await this.getRowByEmail(email).locator('[title="Edit"]').click();
    await this.fillRegistrationForm(updatedRecord);
    await this.submitRegistrationForm();
  }

  async deleteRecord(email: string): Promise<void> {
    await this.search(email);
    await this.getRowByEmail(email).locator('[title="Delete"]').click();
  }

  async search(value: string): Promise<void> {
    await this.page.getByPlaceholder('Type to search').fill(value);
  }

  async clearSearch(): Promise<void> {
    await this.page.getByPlaceholder('Type to search').clear();
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
    await expect(this.page.locator('.rt-tbody .rt-tr-group')).toHaveCount(0);
    await expect(this.page.getByText(/1 of 0/)).toBeVisible();
  }

  async clearSearchWithKeyboard(): Promise<void> {
    const searchInput = this.page.getByPlaceholder('Type to search');

    await searchInput.click();
    await searchInput.press('ControlOrMeta+a');
    await searchInput.press('Backspace');
  }

  async submitEmptyRegistrationForm(): Promise<void> {
    await this.openRegistrationForm();
    await this.submitRegistrationForm();
  }

  async expectRegistrationFormStillOpen(): Promise<void> {
    await expect(this.page.locator('.modal-title')).toHaveText(
      'Registration Form',
    );
  }

  async expectRequiredFieldValidationErrors(): Promise<void> {
    await expect(this.page.locator('#firstName')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#lastName')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#userEmail')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#age')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#salary')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#department')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
  }

  private getRowByEmail(email: string): Locator {
    return this.page.getByRole('row', { name: new RegExp(email, 'i') });
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
