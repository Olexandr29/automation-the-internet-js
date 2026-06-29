const { By } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");

URL = "https://the-internet.herokuapp.com/"
class HomePage{
    constructor(driver){
        this.driver = driver;
        this.locators = {
        loginPageLink : By.linkText("Form Authentication")

        }
    }

    async openLoginPage() {
        const loginPageEl = await this.driver.findElement(this.locators.loginPageLink);
        await loginPageEl.click();
        return new LoginPage(this.driver);
    }

}

module.exports = HomePage