// pages/CheckoutOverviewPage.ts
import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly summaryItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summaryItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }
  private extractNumber(text: string): number {
  return Number(text.replace(/[^0-9.]/g, ''));
  }

  async getItemsCount(): Promise<number> {
    return await this.summaryItems.count();
  }

  async getSubtotal(): Promise<number> {
    const raw = await this.subtotalLabel.textContent();
    return this.extractNumber(raw || '0');
  }

  async getTax(): Promise<number> {
    const raw = await this.taxLabel.textContent();
    return this.extractNumber(raw || '0');
  }

  async getTotal(): Promise<number> {
    const raw = await this.totalLabel.textContent();
    return this.extractNumber(raw || '0');
  }

  async finishPurchase() {
    await this.finishButton.click();
  }

  async cancelPurchase() {
    await this.cancelButton.click();
  }
}
