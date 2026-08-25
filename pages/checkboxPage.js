const BasePage = require("./basePage");
const { By } = require('selenium-webdriver');

class CheckboxPage extends BasePage{
    constructor(driver) {
        super(driver);

        this.locators = {
            checkboxesLocator : By.tagName("input")
        }
    }

    async isCheckboxVisible(checkboxNumber) {
        const checkboxes = await this.driver.findElements(this.locators.checkboxesLocator);
        return await checkboxes[checkboxNumber - 1].isDisplayed();
    }

}

module.exports = CheckboxPage;