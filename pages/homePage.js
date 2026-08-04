const { By } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const BasePage = require('../pages/basePage');
const DropdownPage = require('../pages/dropdownPage');

class HomePage extends BasePage {
    constructor(driver){
        super(driver);
        this.URL = "https://the-internet.herokuapp.com/";
        this.locators = {
        loginPageLink : By.linkText("Form Authentication"),
        dropdownPageLink: By.linkText("Dropdown")
        }

    }

    async openLoginPage() {
        await this.click(this.locators.loginPageLink);
        return new LoginPage(this.driver);
    }

    async openDropdownPage() {
        await this.click(this.locators.dropdownPageLink);
        return new DropdownPage(this.driver)
    }

}

module.exports = HomePage