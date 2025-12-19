import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test("E2E flow: User buys a product successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const overviewPage = new CheckoutOverviewPage(page);
  const completePage = new CheckoutCompletePage(page);

  // 1. Login
  await loginPage.navigate();
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory/);

  // 2. Add product to cart
  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.goToCart();
  await cartPage.goBackToInventory(); // <-- regreso al inventario
  await inventoryPage.addProductToCart("Test.allTheThings() T-Shirt (Red)");
  await inventoryPage.goToCart();

  // 3. Proceed to checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutForm("Harry", "Vasquez", "110111");
  await checkoutPage.submitForm();

  // 4. Validate item in overview page
  const itemCount = await overviewPage.getItemsCount();
  expect(itemCount).toBeGreaterThan(0);

  // 5. Finish purchase
  await overviewPage.finishPurchase();
  await expect(page).toHaveURL(/checkout-complete/);

  // 6. Validate success message
  const headerText = await completePage.getHeaderText();
  expect(headerText).toContain("Thank you for your order!");

  // 7. Back to home
  await completePage.backToHome();
  await expect(page).toHaveURL(/inventory/);
});
