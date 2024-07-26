import { Page } from '@playwright/test';

export class Inventory {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async cartConfirmation() {
    await this.page.getByText('Your Cart').click();
    await this.page.getByText('Teste').click();
  }
}
