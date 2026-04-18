import { expect, type Page } from '@playwright/test';

import { openDemoQaPage } from '../utils/demoqa-ui';

export class SliderPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/slider');
    await expect(
      this.page.getByRole('heading', { name: 'Slider' }),
    ).toBeVisible();
  }

  async moveSliderTo(value: string): Promise<void> {
    const slider = this.page.locator('input[type="range"]');

    await slider.fill(value);
  }

  async expectSliderValue(value: string): Promise<void> {
    await expect(this.page.locator('#sliderValue')).toHaveValue(value);
  }

  async expectInitialSliderValue(value: string): Promise<void> {
    await expect(this.page.locator('#sliderValue')).toHaveValue(value);
  }
}
