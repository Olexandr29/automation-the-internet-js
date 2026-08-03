const BasePage = require("./basePage");
const {By, until} = require('selenium-webdriver');



class DropdwonPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            dropdownLocator : By.tagName("select"),
            optionsLocator : By.tagName("option")
        }
    }


    async isDropwdownVisible() {
        return await this.isBtnDisplayed(this.locators.dropdownLocator);
    }

    async getSelectedDropdownText() {
        const dropdown = await this.find(this.locators.dropdownLocator);
        const options = await dropdown.findElements(this.locators.optionsLocator);

        for (const option of options) {
            if (await option.isSelected()) {
                return await option.getText();
            }
        }
    }

}

module.exports = DropdwonPage;