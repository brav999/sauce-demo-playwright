import { Page, expect } from '@playwright/test';

export class Inventory {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(product: string) {
    await this.page.getByText(product).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async validateProduct(product: string) {
    const item = this.page.getByText(product);
    expect(item).toBeVisible();
  }
}
