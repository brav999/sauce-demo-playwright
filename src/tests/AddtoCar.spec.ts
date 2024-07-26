import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { Inventory } from '../Pages/Inventory';
import dotenv from 'dotenv';

dotenv.config();

const userValid = process.env.USERVALID ? process.env.USERVALID : '';
const passValid = process.env.PASSVALID ? process.env.PASSVALID : '';

let loginpage: LoginPage;
let inventory: Inventory;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  inventory = new Inventory(page);

  await loginpage.go();
  await loginpage.fillUserAndPass(userValid, passValid);
});

test.describe('Adicionando itens ao carrinho', async () => {
  test('Adicionar item ao carrinho', async ({ page }) => {
    await inventory.addToCart('Sauce Labs Onesie');

    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await expect(page.locator('[data-test="remove"]')).toBeVisible();
  });
});
