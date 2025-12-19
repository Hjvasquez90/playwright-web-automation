// pages/CartPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeProduct(productName: string) {
    const product = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await product.locator('button:has-text("Remove")').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async goBackToInventory() {
    await this.continueShoppingButton.click();
  }

  async isProductInCart(productName: string) {
    return await this.page
    .locator('.cart_item')
    .filter({ hasText: productName})
    .isVisible();
  }

  async isErrorVisible() {
    const error = this.page.locator('[data-test="error"]');
    return await error.isVisible();
  }

  async goToCartDirectly(){
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemsCount();
    return count === 0;
  }

}

