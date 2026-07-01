const {By, until} = require('selenium-webdriver')
const BasePage = require("../pages/basePage");

class SecurePage extends BasePage {
    constructor(driver) {
        super(driver);
        this.URL = "https://the-internet.herokuapp.com/secure";
        this.locators = {
            alert : By.id("flash"),
            welcomeMsg : By.className("subheader"),
            logoutBtn : By.className("button secondary radius")
        }
    }

    async getAlertMessage(){
        return await this.getText(this.locators.alert);
    }

    async getWelcomeMessage(){
        return await this.getText(this.locators.welcomeMsg);
    }

    async isLogoutBtnDisplayed(){
        return await this.isBtnDisplayed(this.locators.logoutBtn);
    }

    async logout() {
        const LoginPage = require('../pages/loginPage')
        await this.click(this.locators.logoutBtn);
        await this.waitForUrlContains("/login");
        return new LoginPage(this.driver);
    }


}
module.exports = SecurePage