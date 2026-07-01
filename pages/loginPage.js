const {By, until} = require('selenium-webdriver')
const SecurePage = require('../pages/securePage')
const BasePage = require('../pages/basePage');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
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
        await this.type(this.locators.username, name);
        await this.type(this.locators.password, pas);
        await this.click(this.locators.loginBtn);
        await this.waitForUrlContains("/secure");
        return new SecurePage(this.driver);
    }

    async unsuccessfulLogin(name, pas) {
        await this.type(this.locators.username, name);
        await this.type(this.locators.password, pas);
        await this.click(this.locators.loginBtn);
        return await this.getText(this.locators.alert);
    }

    async isLoginBtnDisplayed() {
        return await this.isBtnDisplayed(this.locators.loginBtn);
    }

    async getLogoutAlert() {
        return await this.getText(this.locators.logoutAlert);
    }

    async getAlertAfterLogoutAndNavBack() {
        return await this.getText(this.locators.alert);
    }

    async isPasHidden() {
        const passwordEl = await this.find(this.locators.password);
        const actualType = await passwordEl.getAttribute("type");
        console.log(`The password input type is '${actualType}'`);
        return actualType == "password";
    }

    async isHiddenValueSaved(pas) {
        const passwordEl = await this.type(this.locators.password, pas);
        const savedValue = await passwordEl.getAttribute("value");
        console.log(`The filled in value was '${pas}' and saved value is '${savedValue}'`);
        return savedValue == pas;
    }


}
module.exports = LoginPage