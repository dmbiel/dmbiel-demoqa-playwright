import { test } from '@playwright/test';

import { ToolTipsPage } from '../../src/pages/tool-tips.page';

test.describe('Smoke tool tips', () => {
  test('shows tooltips for button and text field', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.goto();

    await toolTipsPage.hoverOverButton();
    await toolTipsPage.expectButtonTooltip();

    await toolTipsPage.hoverOverTextField();
    await toolTipsPage.expectTextFieldTooltip();
  });
});
