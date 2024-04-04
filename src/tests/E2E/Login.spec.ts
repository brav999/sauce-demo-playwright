import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.USERVALID ? process.env.USERVALID : "";
const pass = process.env.PASSVALID ? process.env.PASSVALID : "";

let loginpage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  await loginpage.go();
});

test.describe("Testes de Login Válido", async () => {
  test("Login com usuário e senha corretos", async ({ page }) => {
    await loginpage.fillUserAndPass(user, pass);

    await expect(page).toHaveURL(/.*inventory/);
  });
});
