const {By, until} = require('selenium-webdriver')
const SecurePage = require('../pages/securePage')

class LoginPage{
    constructor(driver) {
        this.driver = driver;
        this.URL = "https://the-internet.herokuapp.com/login"
        this.locators = {
            username : By.id("username"),
            password : By.id("password"),
            loginBtn : By.className("radius"),
            alert : By.className("flash error")
        }
    }

    async successfulLogin(name, pas){
        const usernameEl = await this.driver.findElement(this.locators.username);
        await usernameEl.clear();
        await usernameEl.sendKeys(name);
        const passwordEl = await this.driver.findElement(this.locators.password);
        await passwordEl.clear();
        await passwordEl.sendKeys(pas);
        const loginBtnEl = await this.driver.findElement(this.locators.loginBtn);
        await loginBtnEl.click();
        await this.driver.wait(until.urlContains("/secure"), 5000)
        return new SecurePage(this.driver)
    }

    async unsuccessfulLogin(name, pas) {
        const usernameEl = await this.driver.findElement(this.locators.username);
        const passwordEl = await this.driver.findElement(this.locators.password);
        const loginBtnEl = await this.driver.findElement(this.locators.loginBtn);
        await usernameEl.sendKeys(name);
        await passwordEl.sendKeys(pas);
        await loginBtnEl.click();
        const alertEl = await this.driver.wait(until.elementLocated(this.locators.alert), 3000);
        const alertText = await alertEl.getText();
        return alertText;
    }
}
module.exports = LoginPage