import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


test.describe('Login - Pruebas Negativas', () => {

  test('Login inválido muestra mensaje de error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('usuario_falso', 'contraseña_falsa');

    await loginPage.assertInvalidLogin();
  });

});
