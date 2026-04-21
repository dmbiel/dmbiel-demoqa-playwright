import { test } from '@playwright/test';

import { DynamicPropertiesPage } from '../../../src/pages/dynamic-properties.page';

test.describe('Dynamic Properties', () => {
  test('reveals the delayed button after the wait period', async ({ page }) => {
    const dynamicPropertiesPage = new DynamicPropertiesPage(page);

    await dynamicPropertiesPage.goto();
    await dynamicPropertiesPage.expectVisibleAfterButtonInitiallyHidden();
    await dynamicPropertiesPage.waitForVisibleAfterButtonToBeVisible();
  });

  test('enables the delayed button after the wait period', async ({ page }) => {
    const dynamicPropertiesPage = new DynamicPropertiesPage(page);

    await dynamicPropertiesPage.goto();
    await dynamicPropertiesPage.expectEnableAfterButtonInitiallyDisabled();
    await dynamicPropertiesPage.waitForEnableAfterButtonToBeEnabled();
  });

  test('changes the button style after the wait period', async ({ page }) => {
    const dynamicPropertiesPage = new DynamicPropertiesPage(page);

    await dynamicPropertiesPage.goto();
    await dynamicPropertiesPage.expectColorChangeAfterDelay();
  });
});
