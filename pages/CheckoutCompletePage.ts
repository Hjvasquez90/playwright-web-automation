import { Page, Locator } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeMessage = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async getHeaderText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  async getMessageText(): Promise<string | null> {
    return await this.completeMessage.textContent();
  }

  async backToHome() {
    await this.backHomeButton.click();
  }
}
