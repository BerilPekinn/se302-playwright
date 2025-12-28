import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sweetsLink: Locator;
  readonly basketLink: Locator;
  readonly basketCountText: Locator;
  readonly firstAddToBasketBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sweetsLink = page.getByRole('link', { name: 'Sweets' });
    this.basketLink = page.getByRole('link', { name: /Basket/i });
    this.basketCountText = page.getByRole('link', { name: /Basket/i });
    this.firstAddToBasketBtn = page.getByRole('button', { name: 'Add to Basket' }).first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToSweets() {
    await this.sweetsLink.click();
  }

  async goToBasket() {
    await this.basketLink.click();
  }

  async addFirstProductToBasket(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.firstAddToBasketBtn.click();
    }
  }
}
