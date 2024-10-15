import { expect, test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import fs from 'fs';

const userValid = process.env.USERVALID ? process.env.USERVALID : '';
const userInvalid = process.env.USERINVALID ? process.env.USERINVALID : '';
const passValid = process.env.PASSVALID ? process.env.PASSVALID : '';
const passInvalid = process.env.PASSINVALID ? process.env.PASSINVALID : '';

let loginpage: LoginPage;

const logMetrics = (data: any) => {
  fs.appendFileSync('metrics.json', JSON.stringify(data) + '\n');
};

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  await loginpage.go();
});

test.describe('Testes de Login', async () => {
  test('Login com usuário e senha validos', async ({ page }) => {
    const startTimer = Date.now();
    await loginpage.fillUserAndPass(userValid, passValid);

    await expect(page).toHaveURL(/.*inventory/);

    const duration = Date.now() - startTimer;
    logMetrics({ testName: 'Login com dados validos', duration });
  });

  test('Login com usuário incorreto', async ({ page }) => {
    const startTimer = Date.now();
    await loginpage.fillUserAndPass(userInvalid, passValid);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();

    const duration = Date.now() - startTimer;
    logMetrics({ testName: 'Login com usuário incorreto', duration });
  });

  test('Login com senha inválida', async ({ page }) => {
    const startTimer = Date.now();
    await loginpage.fillUserAndPass(userValid, passInvalid);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();

    const duration = Date.now() - startTimer;
    logMetrics({ testName: 'Login com senha inválida', duration });
  });
});
