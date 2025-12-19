import { test as base } from "@playwright/test";

// Lista de usuarios disponibles en SauceDemo
export const USERS = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
    error: { username: 'error_user', password: 'secret_sauce' },
    visual: { username: 'visual_user', password: 'secret_sauce' }
};

// Tipo para las keys permitidas
export type UserKeys = keyof typeof USERS;

// Definición de tipos de fixture
type Fixtures = {
    loginAs: (user: UserKeys) => Promise<void>;
};

// Extender Playwright con fixtures
export const test = base.extend<Fixtures>({
    // Fixture genérica para hacer login según el usuario
    loginAs: async ({ page }, use) => {
        async function performLogin(userKey: UserKeys) {
            const { username, password } = USERS[userKey];

            await page.goto('https://www.saucedemo.com/');
            await page.fill('#user-name', username);
            await page.fill('#password', password);
            await page.click('#login-button');
        }

        await use(performLogin);
    }
});
export const expect = base.expect;




