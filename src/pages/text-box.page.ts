import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export interface TextBoxFormData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TextBoxPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/text-box');
    await expect(
      this.page.getByRole('heading', { name: 'Text Box' }),
    ).toBeVisible();
  }

  async fillAndSubmit(data: TextBoxFormData): Promise<void> {
    await this.page.locator('#userName').fill(data.fullName);
    await this.page.locator('#userEmail').fill(data.email);
    await this.page.locator('#currentAddress').fill(data.currentAddress);
    await this.page.locator('#permanentAddress').fill(data.permanentAddress);
    await this.page.locator('#submit').click({ force: true });
  }

  async fillInvalidEmailAndSubmit(email: string): Promise<void> {
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#submit').click({ force: true });
  }

  async expectSubmittedValues(data: TextBoxFormData): Promise<void> {
    const output = this.page.locator('#output');

    await expect(output).toBeVisible();
    await expect(output.locator('#name')).toHaveText(`Name:${data.fullName}`);
    await expect(output.locator('#email')).toHaveText(`Email:${data.email}`);
    await expect(output.locator('#currentAddress')).toHaveText(
      `Current Address :${data.currentAddress}`,
    );
    await expect(output.locator('#permanentAddress')).toHaveText(
      `Permananet Address :${data.permanentAddress}`,
    );
  }

  async expectNoSubmissionOutput(): Promise<void> {
    await expect(this.page.locator('#output')).not.toBeVisible();
  }

  async expectEmailFieldMarkedInvalid(): Promise<void> {
    await expect(this.page.locator('#userEmail')).toHaveClass(/field-error/);
  }
}
