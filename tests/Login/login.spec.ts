import { LoginPage } from '../../pages/LoginPage';
import { test, expect, USERS } from '../../tests/fixtures/userFixtures';

const USERS_LIST = Object.keys(USERS)
  .filter(u => u !== 'locked') as Array<keyof typeof USERS>;

test.describe('Login exitoso con multiples usuarios', () => {
  for (const user of USERS_LIST) {
    test(`Deberia loguear correctamente con el usuario: ${user}`, async ({ page, loginAs }) => {
      await loginAs(user);
      await expect(page).toHaveURL(/inventory.html/);
    });
  }
});

test.describe('Login - Prueba Positiva', () => {

  test('Login exitoso con usuario standard', async ({ page, loginAs }) => {
    await loginAs('standard');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Intento de login con usuario bloqueado', async ({ page, loginAs }) => {
    const login = new LoginPage(page);

    await loginAs('locked');
    await login.assertInvalidLogin();
  });
});
