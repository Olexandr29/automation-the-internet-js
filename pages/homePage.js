const { By } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const BasePage = require('../pages/basePage');

class HomePage extends BasePage {
    constructor(driver){
        super(driver);
        this.URL = "https://the-internet.herokuapp.com/";
        this.locators = {
        loginPageLink : By.linkText("Form Authentication")
        }
    }

    async openLoginPage() {
        await this.click(this.locators.loginPageLink);
        return new LoginPage(this.driver);
    }

}

module.exports = HomePage