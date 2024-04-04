import { test } from "@playwright/test";
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

test.describe("Descrição da suíte de testes", async () => {
  test("Descrição do test case", async () => {
    loginpage.go;
    await loginpage.fillUserAndPass(user, pass);
  });
});
