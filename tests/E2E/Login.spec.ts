import { test } from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage"

let loginpage: LoginPage

test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page)
    await loginpage.go()
})

test.describe('Descrição da suíte de testes', async () =>{
    test('Descrição do test case', async () =>{
        
    })
})