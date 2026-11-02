const BasePage = require('../pages/basePage');
const { By } = require('selenium-webdriver');
const DynamicControlsData = require('../testData/dynamicControlsData');

class DynamicControlsPage extends BasePage {
    constructor(driver) {   
        super(driver);

    this.locators = {
        header : By.xpath("//div[@class='example']//h4"),
        paragraph : By.tagName("p"),
        checkboxSectionSubheader : By.xpath("//h4[text()='Remove/add']"),
        checkbox : By.id("checkbox"),
        buttonInCheckboxSection : By.xpath("//form[@id='checkbox-example']//button"),
        inputSectionSubheader : By.xpath("//h4[text()='Enable/disable']"),
        inputField : By.xpath("//input[@type='text']"),
        buttonInInputSection : By.xpath("//form[@id='input-example']//button"),
        footer : By.xpath("//div[@style='text-align: center;']"),
        seleniumLink : By.linkText("Elemental Selenium"),
        sauceLabsLnik : By.linkText("Sauce Labs")
    }
}

    async isHeaderDisplayed() {
        return (
        await this.isElementDisplayed(this.locators.header) && 
        (await this.getText(this.locators.header) === DynamicControlsData.HEADER)
        );
    }

    async isParagraphDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.paragraph) &&
            (await this.getText(this.locators.paragraph) === DynamicControlsData.PARAGRAPH)
        );
    }

    async isCheckboxSectionSubheaderDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.checkboxSectionSubheader) &&
            (await this.getText(this.locators.checkboxSectionSubheader) === DynamicControlsData.SUBHEADER_OF_CHECKBOX_SECTION)
        );
    }

    async isChecboxDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.checkbox) &&
            (await this.getText(this.locators.checkbox) === DynamicControlsData.CHECKBOX_TITLE)
        )
    }

    async isRemoveButotnDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.buttonInCheckboxSection) &&
            (await this.getText(this.locators.buttonInCheckboxSection) === DynamicControlsData.REMOVE_BTN_TITLE)
        )
    }

    async isInputSubheaderDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.inputSectionSubheader) &&
            (await this.getText(this.locators.inputSectionSubheader) === DynamicControlsData.SUBHEADER_OF_INPUT_SECTION)
        )
    }


    async isInputFieldDisplayed() {
        return await this.isElementDisplayed(this.locators.inputField)
    }

    async isEnableButtonDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.buttonInInputSection) &&
            (await this.getText(this.locators.buttonInInputSection) === DynamicControlsData.ENABLE_BTN_TITLE)
        )
    } 

    async isFooterDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.footer) &&
            (await this.getText(this.locators.footer) === DynamicControlsData.FOOTER)
        )
    }

    async isSeleniumLinkDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.seleniumLink) &&
            (await this.getText(this.locators.seleniumLink) === DynamicControlsData.SELENIUM_TEXT)
        )
    }

    async isSauceLabsLinkDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.sauceLabsLnik) &&
            (await this.getText(this.locators.sauceLabsLnik) === DynamicControlsData.SAUCE_LABS_TEXT)
        )
    }


}

module.exports = DynamicControlsPage;