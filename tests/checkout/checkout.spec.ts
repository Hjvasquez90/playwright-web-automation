import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

test.describe('Pruebas Checkout', () => {

test('Cancelar checkout-step-one y debe regresar al carrito', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    //Navegar y hacer login
    await login.navigate();
    await login.login('standard_user','secret_sauce');

    //Agregar producto y navegar al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    //Entrar al Checkout
    await cart.proceedToCheckout();

    //Cancelar formulario checkout-step-one
    await checkout.cancelCheckout();

    //Validar navegacion
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});
test('Llenar formulario y cancelar checkout-step-one - debe regresar al carrito', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    //Navegar y hacer login
    await login.navigate();
    await login.login('standard_user','secret_sauce');

    //Agregar producto y navegar al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    //Entrar al Checkout
    await cart.proceedToCheckout();

    //Llenar formulario
    await checkout.fillCheckoutForm('Harry','Vasquez', '110111');

    //Cancelar formulario checkout-step-one
    await checkout.cancelCheckout();

    //Validar navegacion
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});

test('continuar al checkout-step-two', async ({ page }) =>{
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    //Navegar y hacer login
    await login.navigate();
    await login.login('standard_user','secret_sauce');

    //Agregar producto y navegar al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    //Entrar al Checkout
    await cart.proceedToCheckout();

    //Llenar formulario
    await checkout.fillCheckoutForm('Harry','Vasquez', '110111');

    // Ir al checkout-step-two
    await checkout.submitForm();    
});
test('continuar del overview al confirmation screen', async ({ page }) =>{
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);
    //Navegar y hacer login
    await login.navigate();
    await login.login('standard_user','secret_sauce');
    //Agregar producto y navegar al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    //Entrar al Checkout
    await cart.proceedToCheckout();
    //Llenar formulario
    await checkout.fillCheckoutForm('Harry','Vasquez', '110111');
    // Ir al checkout-step-two
    await checkout.submitForm();
    // Validar que existan items
    const count = await overview.getItemsCount();
    expect(count).toBeGreaterThan(0);
    // Validar totales
    const subtotal = await overview.getSubtotal();
    const tax = await overview.getTax();
    const total = await overview.getTotal();
    expect(total).toBeCloseTo(subtotal + tax,2);
    // Continuar al Complete page
    await overview.finishPurchase();    
});
});
