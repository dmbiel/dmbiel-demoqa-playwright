import { expect, test } from '@playwright/test';

import { AlertsPage } from '../../../src/pages/alerts.page';

test.describe('Alerts', () => {
  test('accepts a standard browser alert', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.goto();

    await expect(await alertsPage.triggerImmediateAlert()).toBe(
      'You clicked a button',
    );
  });

  test('accepts a delayed browser alert', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.goto();

    await expect(await alertsPage.triggerDelayedAlert()).toBe(
      'This alert appeared after 5 seconds',
    );
  });

  test('handles confirm and prompt dialogs', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await alertsPage.goto();
    await expect(await alertsPage.confirmAction()).toBe(
      'Do you confirm action?',
    );
    await alertsPage.expectConfirmResult('You selected Ok');

    await expect(await alertsPage.fillPrompt('Codex QA')).toBe(
      'Please enter your name',
    );
    await alertsPage.expectPromptResult('You entered Codex QA');
  });
});
