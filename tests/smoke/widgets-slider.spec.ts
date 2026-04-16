import { test } from '@playwright/test';

import { SliderPage } from '../../src/pages/slider.page';

test.describe('Smoke slider', () => {
  test('moves the slider and updates the value field', async ({ page }) => {
    const sliderPage = new SliderPage(page);

    await sliderPage.goto();
    await sliderPage.moveSliderTo('75');
    await sliderPage.expectSliderValue('75');
  });
});
