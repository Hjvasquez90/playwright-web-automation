import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Carrito - Agregar productos', () => {
    
    test('Agregar 2 prodcutos al carrito', async ({ page }) => {
        const login = new LoginPage (page);
        const inventory = new InventoryPage (page);
        const cart = new CartPage (page);

        // Hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');
        // Agregar productos al carrison
        await inventory.addProductToCart('Sauce Labs Onesie');
        await inventory.addProductToCart('Sauce Labs Bike Light');
        // Ir al carrito
        await inventory.goToCart();
        // Validar productos
        await expect( await cart.isProductInCart('Sauce Labs Onesie')).toBeTruthy();
        await expect( await cart.isProductInCart('Sauce Labs Bike Light')).toBeTruthy();
        const count = await cart.getCartItemsCount();
        expect(count).toBe(2);
    });

    test('Agregar un producto al carro', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');
        // Agregar un producto al carrito
        await inventory.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        // Ir al carrito
        await inventory.goToCart();
        // Validar producto
        await expect( await cart.isProductInCart('Test.allTheThings() T-Shirt (Red)')).toBeTruthy();
        const count = await cart.getCartItemsCount();
        expect(count).toBe(1);     
    });

    test('Remover producto desde el carrito', async ({ page }) =>{
        const login = new LoginPage(page);
        const inverntory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        
        // Hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');
        // Agregar producto al carrito
        await inverntory.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        // Ir al carrito
        await inverntory.goToCart();
        // Remover producto desde el carrito
        await cart.removeProduct('Test.allTheThings() T-Shirt (Red)');
        // Comprobar que el producto ya no este en el carro
        const exist = await cart.isProductInCart('Test.allTheThings() T-Shirt (Red)');
        expect(exist).toBeFalsy();
    });

    test('Volver al inventario desde el carrito', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');
        // Agregar un producto
        await inventory.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        // Ir al carrito
        await inventory.goToCart();
        // Volver al inventario desde el carrito
        await cart.goBackToInventory();
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    });

