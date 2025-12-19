import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly filterDropdown: Locator;
  readonly cartButton: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.filterDropdown = page.locator('.product_sort_container');
    this.cartButton = page.locator('#shopping_cart_container a.shopping_cart_link');
    this.productTitles = page.locator('.inventory_item_name');
  }

  async selectFilter(option: string) {
    await this.filterDropdown.selectOption(option);
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.waitFor({ state: 'visible' });
    await product.locator('button:has-text("Add to cart")').click();
  }

  async goToCart() {
    const cartLink = this.page.locator('.shopping_cart_link');
    await cartLink.waitFor({ state: 'visible', timeout: 5000});
    await Promise.all([
      this.page.waitForURL(/cart/).catch(() => {}),
      cartLink.click()
    ]);
  }
}
