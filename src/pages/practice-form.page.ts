import { expect, type Locator, type Page } from '@playwright/test';

import type {
  Gender,
  Hobby,
  PracticeFormData,
} from '../data/practice-form.data';
import { openDemoQaPage } from '../utils/demoqa-ui';

const genderInputIds: Record<Gender, string> = {
  Male: 'gender-radio-1',
  Female: 'gender-radio-2',
  Other: 'gender-radio-3',
};

const hobbyInputIds: Record<Hobby, string> = {
  Sports: 'hobbies-checkbox-1',
  Reading: 'hobbies-checkbox-2',
  Music: 'hobbies-checkbox-3',
};

export class PracticeFormPage {
  constructor(private readonly page: Page) {}

  private subjectsInput(): Locator {
    return this.page.locator('#subjectsInput');
  }

  private subjectOption(subject: string): Locator {
    return this.page
      .locator('.subjects-auto-complete__menu')
      .getByText(subject, {
        exact: true,
      });
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/automation-practice-form');
    await expect(
      this.page.getByRole('heading', { name: 'Practice Form' }),
    ).toBeVisible();
  }

  async fillForm(form: PracticeFormData): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(form.firstName);
    await this.page.getByPlaceholder('Last Name').fill(form.lastName);
    await this.page.locator('#userEmail').fill(form.email);
    await this.page
      .locator(`label[for="${genderInputIds[form.gender]}"]`)
      .click();
    await this.page.locator('#userNumber').fill(form.mobile);

    await this.setDateOfBirth(form.dateOfBirth);

    for (const subject of form.subjects) {
      await this.subjectsInput().fill(subject);
      await this.subjectOption(subject).click();
    }

    for (const hobby of form.hobbies) {
      await this.page.locator(`label[for="${hobbyInputIds[hobby]}"]`).click({
        force: true,
      });
    }

    await this.page.locator('#currentAddress').fill(form.currentAddress);
    await this.page.locator('#uploadPicture').setInputFiles(form.picturePath);
    await this.selectState(form.state);
    await this.selectCity(form.city);
  }

  async submit(): Promise<void> {
    await this.page.locator('#submit').click();
  }

  async fillRequiredFieldsOnly(
    form: Pick<
      PracticeFormData,
      'firstName' | 'lastName' | 'gender' | 'mobile'
    >,
  ): Promise<void> {
    await this.page.getByPlaceholder('First Name').fill(form.firstName);
    await this.page.getByPlaceholder('Last Name').fill(form.lastName);
    await this.page
      .locator(`label[for="${genderInputIds[form.gender]}"]`)
      .click();
    await this.page.locator('#userNumber').fill(form.mobile);
  }

  async expectSuccessfulSubmission(form: PracticeFormData): Promise<void> {
    const modal = this.page.locator('.modal-content');

    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-title')).toHaveText(
      'Thanks for submitting the form',
    );

    await this.expectSubmittedValue(
      'Student Name',
      `${form.firstName} ${form.lastName}`,
    );
    await this.expectSubmittedValue('Student Email', form.email);
    await this.expectSubmittedValue('Gender', form.gender);
    await this.expectSubmittedValue('Mobile', form.mobile);
    await this.expectSubmittedValue(
      'Date of Birth',
      `${Number(form.dateOfBirth.day)} ${form.dateOfBirth.month},${form.dateOfBirth.year}`,
    );
    await this.expectSubmittedValue('Subjects', form.subjects.join(', '));
    await this.expectSubmittedValue('Hobbies', form.hobbies.join(', '));
    await this.expectSubmittedValue('Picture', 'avatar.txt');
    await this.expectSubmittedValue('Address', form.currentAddress);
    await this.expectSubmittedValue(
      'State and City',
      `${form.state} ${form.city}`,
    );
  }

  async expectSubmissionModalHidden(): Promise<void> {
    await expect(this.page.locator('.modal-content')).not.toBeVisible();
  }

  async expectRequiredFieldErrors(): Promise<void> {
    await expect(this.page.getByPlaceholder('First Name')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.getByPlaceholder('Last Name')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#userNumber')).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.',
    );
    await expect(this.page.locator('#genterWrapper')).toContainText('Gender');
  }

  async expectInvalidMobileValidationMessage(): Promise<void> {
    await expect
      .poll(async () => {
        return this.page.evaluate(() => {
          const input = document.querySelector<HTMLInputElement>('#userNumber');
          return input?.checkValidity() ?? true;
        });
      })
      .toBe(false);

    await expect
      .poll(async () => {
        return this.page.evaluate(() => {
          const input = document.querySelector<HTMLInputElement>('#userNumber');
          return input?.validationMessage ?? '';
        });
      })
      .toContain('10 characters');
  }

  private async setDateOfBirth(dateOfBirth: PracticeFormData['dateOfBirth']) {
    await this.page.locator('#dateOfBirthInput').click();
    await this.page.locator('.react-datepicker__month-select').selectOption({
      label: dateOfBirth.month,
    });
    await this.page.locator('.react-datepicker__year-select').selectOption({
      label: dateOfBirth.year,
    });

    const dayValue = dateOfBirth.day.padStart(3, '0');
    await this.page
      .locator(
        `.react-datepicker__day--${dayValue}:not(.react-datepicker__day--outside-month)`,
      )
      .first()
      .click();
  }

  private async selectState(state: string): Promise<void> {
    await this.page.locator('#state').click();
    await this.page.getByText(state, { exact: true }).click();
  }

  private async selectCity(city: string): Promise<void> {
    await this.page.locator('#city').click();
    await this.page.getByText(city, { exact: true }).click();
  }

  private async expectSubmittedValue(
    label: string,
    expectedValue: string,
  ): Promise<void> {
    const row = this.page.locator('.modal-content tr').filter({
      has: this.page.getByText(label, { exact: true }),
    });

    await expect(row.locator('td').nth(1)).toHaveText(expectedValue);
  }
}
