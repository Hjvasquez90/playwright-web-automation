import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Security Tests', () => {

    test('Blocked user cannot access inventory even via URL manipulation', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');

        await loginPage.assertInvalidLogin();

        // Intentar navegar manualmente
        await page.goto('/inventory.html');

        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('User session is not shared across new browser context', async ({ browser }) => {
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();

        const loginPage = new LoginPage(page1);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page1).toHaveURL(/inventory/);

        // Nuevo contexto (como otro navegador)

        const context2 = await browser.newContext();
        const page2 = await context2.newPage();

        await page2.goto('/inventory.html');

        //No deberia tener sesion
        await expect(page2).toHaveURL('https://www.saucedemo.com/');
        await expect(page2.locator('#login-button')).toBeVisible();
    });
});