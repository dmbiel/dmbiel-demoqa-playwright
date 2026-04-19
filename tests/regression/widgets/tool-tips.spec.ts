import { test } from '@playwright/test';

import { ToolTipsPage } from '../../../src/pages/tool-tips.page';

test.describe('Tool Tips', () => {
  test('shows tooltips for the button and text field', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.goto();
    await toolTipsPage.hoverOverButton();
    await toolTipsPage.expectButtonTooltip();

    await toolTipsPage.hoverOverTextField();
    await toolTipsPage.expectTextFieldTooltip();
  });

  test('shows tooltips for both inline text links', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);

    await toolTipsPage.goto();
    await toolTipsPage.hoverOverContraryLink();
    await toolTipsPage.expectContraryTooltip();

    await toolTipsPage.hoverOverSectionNumberLink();
    await toolTipsPage.expectSectionNumberTooltip();
  });
});
