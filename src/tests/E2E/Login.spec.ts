import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import dotenv from "dotenv";

dotenv.config();

const userValid = process.env.USERVALID ? process.env.USERVALID : "";
const userInvalid = process.env.USERINVALID ? process.env.USERINVALID : "";
const passValid = process.env.PASSVALID ? process.env.PASSVALID : "";
const passInvalid = process.env.PASSINVALID ? process.env.PASSINVALID : "";

let loginpage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  await loginpage.go();
});

test.describe("Testes de Login Válido", async () => {
  test("Login com usuário e senha corretos", async ({ page }) => {
    await loginpage.fillUserAndPass(userValid, passValid);

    await expect(page).toHaveURL(/.*inventory/);
  });

  test("Login com usuário incorreto", async ({ page }) => {
    await loginpage.fillUserAndPass(userInvalid, passValid);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });

  test("Login com senha inválida", async ({ page }) => {
    await loginpage.fillUserAndPass(userValid, passInvalid);

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });
});
