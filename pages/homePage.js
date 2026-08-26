const { By } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const BasePage = require('../pages/basePage');
const DropdownPage = require('../pages/dropdownPage');
const CheckboxPage = require('../pages/checkboxPage')


class HomePage extends BasePage {
    static URL = "https://the-internet.herokuapp.com/";

    constructor(driver){
        super(driver);
        this.locators = {
        loginPageLink : By.linkText("Form Authentication"),
        dropdownPageLink: By.linkText("Dropdown"),
        checkboxPageLink: By.linkText("Checkboxes")
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

    async isDropdownLinkVisible() {
        return await this.isBtnDisplayed(this.locators.dropdownPageLink);
    }

    async openCheckboxPage() {
        await this.click(this.locators.checkboxPageLink);
        return new CheckboxPage(this.driver)
    }

}

module.exports = HomePage