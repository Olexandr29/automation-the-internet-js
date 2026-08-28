const {By, until} = require('selenium-webdriver')
const SecurePage = require('../pages/securePage')
const BasePage = require('../pages/basePage');
const Reporter = require("../utils/reporter");
const { allure } = require('allure-mocha/runtime');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.URL = "https://the-internet.herokuapp.com/login"
        this.locators = {
            username : By.id("username"),
            password : By.id("password"),
            loginBtn : By.className("radius"),
            alert : By.css(".flash.error"),
            logoutAlert: By.css(".flash.success")
        }
    }

    async login(name, pas){
        await Reporter.step("Fill in the Username field", async () => {
        await this.type(this.locators.username, name);
        });
        await Reporter.step("Fill in the Password field", async () => {
        await this.type(this.locators.password, pas);
        });
        await Reporter.step("Click the Login button", async () => {
        await this.click(this.locators.loginBtn);
        });
    }

     async successfulLogin(name, pas){
        await this.login(name, pas);
        await this.waitForUrlContains("/secure");
        return new SecurePage(this.driver);
    }


    async unsuccessfulLogin(name, pas) {
        await this.login(name, pas);
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
        return await Reporter.step("Verify Password field is masked", async () => {
        const passwordEl = await this.find(this.locators.password);
        const actualType = await passwordEl.getAttribute("type");
        console.log(`The password input type is '${actualType}'`);
        return actualType == "password";
        });
    }

    async isHiddenValueSaved(pas) {
        return await Reporter.step("Verify entered password is preserved", async () => {
        const passwordEl = await this.type(this.locators.password, pas);
        const savedValue = await passwordEl.getAttribute("value");
        console.log(`The filled in value was '${pas}' and saved value is '${savedValue}'`);
        return savedValue == pas;
        });
    }


}
module.exports = LoginPage