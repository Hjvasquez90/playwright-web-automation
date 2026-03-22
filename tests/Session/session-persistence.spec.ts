import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Session Persistance', () => {
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user','secret_sauce');

        await expect(page).toHaveURL(/inventory/);
    });

    test('User reamins logged after page refresh', async ({ page }) => {
        await page.reload();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('User session persist when opening a new tab', async ({ page, context }) => {
        const newPage = await context.newPage();

        await newPage.goto('/inventory.html');

        await expect(newPage).toHaveURL('/inventory.html');
        await expect(newPage.locator('.inventory_list')).toBeVisible();
    });


    test('User cannot access the inventory after logout using browser back', async ({ page }) => {
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');

        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await page.goBack();
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });


});
