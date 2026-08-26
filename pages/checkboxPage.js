const BasePage = require("./basePage");
const { By, ActionChains, Key } = require('selenium-webdriver');
const Reporter = require('../utils/reporter');
const {allure} = require('allure-mocha/runtime');

class CheckboxPage extends BasePage{
    constructor(driver) {
        super(driver);

        this.locators = {
            checkboxesLocator : By.tagName("input")
        }
    }

    async isCheckboxVisible(checkboxNumber) {
        return await Reporter.step(`Observe the Checkbox${checkboxNumber} is visible`, async () => {
        const checkboxes = await this.driver.findElements(this.locators.checkboxesLocator);
        return await checkboxes[checkboxNumber - 1].isDisplayed();
        });
    }

    async isCheckboxChecked(checkboxNumber) {
        const checkboxes = await this.driver.findElements(this.locators.checkboxesLocator);
        return await checkboxes[checkboxNumber - 1].isSelected();
    }

    async changeCheckboxState(checkboxNumber) {
        return await Reporter.step(`Change Checkbox${checkboxNumber} state`, async () => {
        const checkboxes = await this.driver.findElements(this.locators.checkboxesLocator);
        return await checkboxes[checkboxNumber - 1].click();
         });
    }

    async focusCheckbox(checkboxNumber) {
        await Reporter.step(`Navigate to the Checkbox ${checkboxNumber} via Tab key`, async () => {
        const checkboxes = await this.driver.findElements(this.locators.checkboxesLocator);
        const targetCheckbox = checkboxes[checkboxNumber - 1];
        const targetCheckboxId = await targetCheckbox.getId();
        for (let i = 0; i < 10; i++) {
            await this.driver.actions().sendKeys(Key.TAB).perform();
            const activeElement = await this.driver.switchTo().activeElement();
            const activeElementId = await activeElement.getId();           
            if (await activeElementId === targetCheckboxId) {
                return;
            }
        }
        throw new Error(`Checkbox ${checkboxNumber} could not be focused using Tab`);
        }
    );
}

    async changeCheckboxStateBySpaceKey() {
        return await Reporter.step(`Change state via Space key`, async () => {
        await this.driver.actions().sendKeys(Key.SPACE).perform();
        });
    }


}

module.exports = CheckboxPage;