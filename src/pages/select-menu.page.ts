import { expect, type Locator, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class SelectMenuPage {
  constructor(private readonly page: Page) {}

  private valueInput(): Locator {
    return this.page.locator('#react-select-2-input');
  }

  private valueOption(optionText: string): Locator {
    return this.page.locator('#react-select-2-listbox').getByText(optionText, {
      exact: true,
    });
  }

  private oneColorInput(): Locator {
    return this.page.locator('#react-select-3-input');
  }

  private oneColorOption(optionText: string): Locator {
    return this.page.locator('#react-select-3-listbox').getByText(optionText, {
      exact: true,
    });
  }

  private multiColorInput(): Locator {
    return this.page.locator('#react-select-4-input');
  }

  private multiColorOption(optionText: string): Locator {
    return this.page.locator('#react-select-4-listbox').getByText(optionText, {
      exact: true,
    });
  }

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/select-menu');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Select Menu',
      primaryControls: [this.page.locator('#withOptGroup')],
    });
  }

  async selectValue(optionText: string): Promise<void> {
    await this.page.locator('#withOptGroup').click();
    await this.valueInput().fill(optionText);
    await this.valueOption(optionText).click();
  }

  async expectSelectedValue(optionText: string): Promise<void> {
    await expect(this.page.locator('#withOptGroup')).toContainText(optionText);
  }

  async selectOneColor(optionText: string): Promise<void> {
    await this.page.locator('#selectOne').click();
    await this.oneColorInput().fill(optionText);
    await this.oneColorOption(optionText).click();
  }

  async expectSelectedOneColor(optionText: string): Promise<void> {
    await expect(this.page.locator('#selectOne')).toContainText(optionText);
  }

  async selectOldStyleColor(colorLabel: string): Promise<void> {
    await this.page
      .locator('#oldSelectMenu')
      .selectOption({ label: colorLabel });
  }

  async expectSelectedOldStyleColor(colorLabel: string): Promise<void> {
    await expect(
      this.page.locator('#oldSelectMenu').locator('option:checked'),
    ).toHaveText(colorLabel);
  }

  async selectMultipleColors(colors: string[]): Promise<void> {
    await this.multiColorInput().click();

    for (const color of colors) {
      await this.multiColorInput().fill(color);
      await this.multiColorOption(color).click();
    }
  }

  async expectSelectedMultipleColors(colors: string[]): Promise<void> {
    const multiselectBlock = this.page
      .locator('#selectMenuContainer')
      .locator('div', {
        has: this.page.getByText('Multiselect drop down', { exact: true }),
      })
      .first();

    for (const color of colors) {
      await expect(
        multiselectBlock.getByText(color, { exact: true }),
      ).toBeVisible();
    }
  }

  async selectCars(values: string[]): Promise<void> {
    await this.page.locator('#cars').selectOption(values);
  }

  async expectSelectedCars(values: string[]): Promise<void> {
    await expect(this.page.locator('#cars')).toHaveValues(values);
  }
}
