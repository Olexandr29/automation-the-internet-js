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
            alert : By.className("flash error"),
            logoutAlert: By.className("flash success")
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

    async isLoginBtnDisplayed() {
        const buttons = await this.driver.findElements(this.locators.loginBtn);
        if (buttons.length == 0) {
            return false;
        }
        for (let i = 0; i < buttons.length; i++){
            const result = await buttons[i].isDisplayed();
            if (result == true) {
                return true;
            }
        }   
        return false;
    }

    async getLogoutAlert() {
        const logoutAlertEl = await this.driver.findElement(this.locators.logoutAlert);
        const logoutAlertTxt = await logoutAlertEl.getText()
        return logoutAlertTxt;
    }

    async getAlertAfterLogoutAndNavBack() {
        const alertEl = await this.driver.findElement(this.locators.alert);
        const alertTxt = await alertEl.getText();
        return alertTxt; 
    }

    async isPasHidden() {
        const passwordEl = await this.driver.findElement(this.locators.password);
        const actualType = await passwordEl.getAttribute("type");
        console.log(`The password input type is '${actualType}'`);
        return actualType == "password";
    }

    async isHiddenValueSaved(pas) {
        const passwordEl = await this.driver.findElement(this.locators.password);
        await passwordEl.sendKeys(pas);
        const savedValue = await passwordEl.getAttribute("value");
        console.log(`The filled in value was '${pas}' and saved value is '${savedValue}'`);
        return savedValue == pas;
    }




}
module.exports = LoginPage