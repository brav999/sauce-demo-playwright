import { Page } from '@playwright/test'

export class LoginPage{
    readonly page:Page

    constructor(page: Page){
        this.page = page
    }

    async go(){
        await this.page.goto('https://www.saucedemo.com')
    }

    async fillUserAndPass(username: string, password: string){
        const userAccess = this.page.locator('')
        const passAccess = this.page.locator('')
        const loginButton = this.page.locator('')
        
        await userAccess.fill(username)
        await passAccess.fill(password)
        loginButton.click
    }
}