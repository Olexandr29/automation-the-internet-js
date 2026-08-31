const BasePage = require("../pages/basePage");
const {By, Key} = require('selenium-webdriver');
const Reporter = require("../utils/reporter");

class DropdownPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            dropdownLocator : By.tagName("select"),
            optionsLocator : By.tagName("option")
        }
    }


    async isDropdownVisible() {
        return await this.isElementDisplayed(this.locators.dropdownLocator);
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

    async openDropdown() {
        return await this.click(this.locators.dropdownLocator);
    }

    async getAllOptions() {
        const optionsText = [];
        const optionsEllements = await this.driver.findElements(this.locators.optionsLocator);
        for (let option of optionsEllements) {
           optionsText.push(await option.getText());
        }
        return optionsText;
    }

    async selectOption(specificOption) {
        await Reporter.step(`Select "${specificOption}" from dropdown`, async () => {

        const optionsEllements = await this.driver.findElements(this.locators.optionsLocator);
        for (let option of optionsEllements ) {
            if ((await option.getText()) === specificOption) {
                await option.click();
                return 
            } 
        }
        throw new Error(`The option "${specificOption}" was not found`);
        });
    }

    async openDropdownByPressEnter() {
        await this.pressKey(this.locators.dropdownLocator, Key.ENTER);
    }

    async pressEscape() {
        await this.pressKey( this.locators.dropdownLocator, Key.ESCAPE);
    }

    async makeDropdownFocused() {
        await Reporter.step("Focus dropdown", async () => {
        const dropdown = await this.find(this.locators.dropdownLocator);
        const targetDropdown = dropdown;
        await this.focusElementByTab(targetDropdown)
        });
    }

    async isDropdownFocused() {
        const dropdown = await this.find(this.locators.dropdownLocator);
        return this.isElementFocused(dropdown);
    }

    async pressArrowDown() {
        await this.pressKey(this.locators.dropdownLocator, Key.ARROW_DOWN);
    }

    async pressArrowUp() {
        await this.pressKey(this.locators.dropdownLocator, Key.ARROW_UP)
    }


}

module.exports = DropdownPage;