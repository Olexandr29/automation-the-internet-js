const BasePage = require("./basePage");
const { By, Key } = require('selenium-webdriver');
const Reporter = require('../utils/reporter');

class CheckboxPage extends BasePage{
    constructor(driver) {
        super(driver);

        this.locators = {
            checkboxesLocator : By.tagName("input")
        }
    }

    async isCheckboxVisible(checkboxNumber) {
        return await Reporter.step(`Observe the Checkbox${checkboxNumber} is visible`, async () => {
        const checkbox = await this.findElementsByNumber(this.locators.checkboxesLocator, checkboxNumber);
        return await checkbox.isDisplayed();
        });
    }

    async isCheckboxChecked(checkboxNumber) {
        const checkbox = await this.findElementsByNumber(this.locators.checkboxesLocator, checkboxNumber);
        return await checkbox.isSelected();
    }

    async changeCheckboxState(checkboxNumber) {
        return await Reporter.step(`Change Checkbox${checkboxNumber} state`, async () => {
        const checkbox = await this.findElementsByNumber(this.locators.checkboxesLocator, checkboxNumber);
        return await checkbox.click();
         });
    }

    async focusCheckbox(checkboxNumber) {
        await Reporter.step(`Navigate to the Checkbox ${checkboxNumber} via Tab key`, async () => {
        const targetCheckbox = await this.findElementsByNumber(this.locators.checkboxesLocator, checkboxNumber);
        await this.focusElementByTab(targetCheckbox);
        });
    }

     async isCheckboxFocused(checkboxNumber) {
        const targetCheckbox = await this.findElementsByNumber(this.locators.checkboxesLocator, checkboxNumber);
        return await this.isElementFocused(targetCheckbox);
    }

    async changeCheckboxStateBySpaceKey() {
        return await Reporter.step(`Change state via Space key`, async () => {
        await this.driver.actions().sendKeys(Key.SPACE).perform();
        });
    }


}

module.exports = CheckboxPage;