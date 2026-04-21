import { test } from '@playwright/test';

import { DynamicPropertiesPage } from '../../src/pages/dynamic-properties.page';

test.describe('Smoke dynamic properties', () => {
  test('waits until the delayed button becomes enabled', async ({ page }) => {
    const dynamicPropertiesPage = new DynamicPropertiesPage(page);

    await dynamicPropertiesPage.goto();
    await dynamicPropertiesPage.expectEnableAfterButtonInitiallyDisabled();
    await dynamicPropertiesPage.waitForEnableAfterButtonToBeEnabled();
  });
});
