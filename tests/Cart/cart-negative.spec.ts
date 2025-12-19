import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';


test.describe('Carrito - Pruebas Negativas', () => {

        test('No permitir acceder al carrito sin haber hecho login', async ({ page }) => {
        const cart = new CartPage(page);

        // Intentar ir directamente al carrito sin login
        await page.goto('https://www.saucedemo.com/cart.html');

        // Validar redireccion al login
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Validar que el formulario de login este presente y visible
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Interntar eliminar un producto que NO existe', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        
        // Hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');
        // Agregar un producto
        await inventory.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        // Ir al carrito
        await inventory.goToCart();
        // Validar que el producto en el carro sea el que se agrego
        await cart.isProductInCart('Test.allTheThings() T-Shirt (Red)');
        // Validar que producto que NO existe no se pueda eliminar
        const exist = await cart.isProductInCart('BREAK.allTheThings() Shoes (Red)');
        expect(exist).toBeFalsy;

    });
    }); 
