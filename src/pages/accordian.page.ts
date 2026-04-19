import { expect, type Page } from '@playwright/test';

import {
  expectDemoQaContentPageReady,
  openDemoQaPage,
} from '../utils/demoqa-ui';

export class AccordianPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await openDemoQaPage(this.page, '/accordian');
    await expectDemoQaContentPageReady(this.page, {
      heading: 'Accordian',
      primaryControls: [
        this.page.getByRole('button', { name: 'What is Lorem Ipsum?' }),
      ],
    });
  }

  async expectFirstSectionVisible(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'What is Lorem Ipsum?' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await expect(
      this.page.getByText(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      ),
    ).toBeVisible();
  }

  async openSecondSection(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Where does it come from?' })
      .click();
  }

  async expectSecondSectionVisible(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'Where does it come from?' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await expect(
      this.page.getByText(
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      ),
    ).toBeVisible();
  }

  async openThirdSection(): Promise<void> {
    await this.page.getByRole('button', { name: 'Why do we use it?' }).click();
  }

  async expectThirdSectionVisible(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'Why do we use it?' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await expect(
      this.page.getByText(
        'It is a long established fact that a reader will be distracted',
      ),
    ).toBeVisible();
  }

  async expectFirstSectionCollapsed(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'What is Lorem Ipsum?' }),
    ).toHaveAttribute('aria-expanded', 'false');
  }

  async expectSecondSectionCollapsed(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'Where does it come from?' }),
    ).toHaveAttribute('aria-expanded', 'false');
  }

  async expectThirdSectionCollapsed(): Promise<void> {
    await expect(
      this.page.getByRole('button', { name: 'Why do we use it?' }),
    ).toHaveAttribute('aria-expanded', 'false');
  }
}
