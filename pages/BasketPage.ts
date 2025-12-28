import { Page, Locator } from '@playwright/test';

export class BasketPage {
  readonly page: Page;
  readonly continueBtn: Locator;

  readonly firstNameError: Locator;
  readonly emailError: Locator;
  readonly zipError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueBtn = page.getByRole('button', { name: /Continue to checkout/i });

    this.firstNameError = page.getByText('Valid first name is required.');
    this.emailError = page.getByText('Please enter a valid email address for shipping updates.');
    this.zipError = page.getByText('Zip code required.');
  }

  async goto() {
    await this.page.goto('/basket');
  }

  async submitEmptyCheckout() {
    await this.continueBtn.click();
  }
}
