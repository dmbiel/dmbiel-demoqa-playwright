import { test } from '@playwright/test';

import { SliderPage } from '../../../src/pages/slider.page';

test.describe('Slider', () => {
  test('starts with the default value and moves to lower and higher bounds', async ({
    page,
  }) => {
    const sliderPage = new SliderPage(page);

    await sliderPage.goto();
    await sliderPage.expectInitialSliderValue('25');

    await sliderPage.moveSliderTo('0');
    await sliderPage.expectSliderValue('0');

    await sliderPage.moveSliderTo('100');
    await sliderPage.expectSliderValue('100');
  });
});
