const BasePage = require('../pages/basePage');
const { By, until } = require('selenium-webdriver');
const DynamicControlsData = require('../testData/dynamicControlsData');

class DynamicControlsPage extends BasePage {
    constructor(driver) {   
        super(driver);

    this.locators = {
        header : By.xpath("//div[@class='example']//h4"),
        paragraph : By.tagName("p"),
        checkboxSectionSubheader : By.xpath("//h4[text()='Remove/add']"),
        checkbox : By.id("checkbox"),
        checkboxContainer : By.xpath("//form[@id='checkbox-example']//div[.//input[@type='checkbox']]"),
        buttonInCheckboxSection : By.xpath("//form[@id='checkbox-example']//button"),
        removeBtn : By.xpath("//button[text()='Remove']"),
        addBtn : By.xpath("//button[text()='Add']"),
        waitTxt : By.xpath("//div[@id='loading']"),
        progressBar : By.xpath("//img[@src='/img/ajax-loader.gif']"),
        messageInCheckboxSection : By.xpath("//form[@id='checkbox-example']//p[@id='message']"),
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
            await this.isElementDisplayed(this.locators.checkboxContainer) 
            &&
            (await this.getCheckboxTextWithLocatorCheckboxContainer() === DynamicControlsData.CHECKBOX_TITLE)
        )
    }

    async getCheckboxTextWithLocatorCheckboxContainer() {
        const textWithLocatorCheckboxContainer = await this.getText(this.locators.checkboxContainer);
        console.log(`TextWithLocatorCheckbox = '${textWithLocatorCheckboxContainer}'`)
        console.log(`Text from test data = '${DynamicControlsData.CHECKBOX_TITLE}'`)
        return textWithLocatorCheckboxContainer
    }

async debugCheckboxHtml() {
    const element = await this.find(this.locators.checkbox);

    const html = await element.getAttribute("outerHTML");

    console.log("Checkbox outerHTML:", html);
}


    async isCheckboxChecked() {
        return (await this.find(this.locators.checkboxContainer)).isSelected()
    }

    async clickOnCheckbox() {
        return await this.click(this.locators.checkboxContainer)
    }

    async isRemoveButotnDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.buttonInCheckboxSection) &&
            (await this.getText(this.locators.buttonInCheckboxSection) === DynamicControlsData.REMOVE_BTN_TITLE)
        )
    }

    async clickOnRemoveBtn() {
        return await this.click(this.locators.removeBtn)
    }

    async clickOnAddBtn() {
        return await this.click(this.locators.addBtn)
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

    async getWaitText() {
        return await this.getText(this.locators.waitTxt)
    }


    async isWaitTxtDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.waitTxt) && 
            (await this.getWaitText() === DynamicControlsData.WAIT_TEXT)
        )
    }

    async isProgressBarDisplayed() {
        return await this.isElementDisplayed(this.locators.progressBar)
    }

    async isWaitTextAndProgressBarDisplayed(){
        return (
            await this.isWaitTxtDisplayed() &&
            await this.isProgressBarDisplayed()
        )
    }

    async waitUntilCheckboxAbsent() {
        return await this.waitUntilElementAbsent(this.locators.checkbox)
    }

    async isCheckboxAbsentOrHidden() {
        await this.waitUntilCheckboxAbsent()
        const checkboxes = await this.driver.findElements(this.locators.checkbox);
        return checkboxes.length === 0 || !(await checkboxes[0].isDisplayed())
    }

    async getBtnTxtInCheckboxSection() {
        return await this.getText(this.locators.buttonInCheckboxSection)
    }

    async isBtnTxtChangedFromRemoveToAdd() {
        return await this.getBtnTxtInCheckboxSection() !== DynamicControlsData.REMOVE_BTN_TITLE &&
        await this.getBtnTxtInCheckboxSection() === DynamicControlsData.ADD_BTN_TITLE
    }

    async getMsgAfterRemove() {
        return await this.getText(this.locators.messageInCheckboxSection) 

    }
    async isMsgAfterRemoveDisplayed() {
        return await this.isElementDisplayed(this.locators.messageInCheckboxSection) &&
        await this.getMsgAfterRemove() === DynamicControlsData.MESSAGE_AFTER_REMOVE
    }
    
    async isBtnTxtChangedFromAddToRemove() {
        return await this.getBtnTxtInCheckboxSection() !== DynamicControlsData.ADD_BTN_TITLE &&
        await this.getBtnTxtInCheckboxSection() === DynamicControlsData.REMOVE_BTN_TITLE
    }

    async getMsgAfterAdd() {
        return await this.getText(this.locators.messageInCheckboxSection) 

    }
    async isMsgAfterAddDisplayed() {
        return await this.isElementDisplayed(this.locators.messageInCheckboxSection) &&
        await this.getMsgAfterAdd() === DynamicControlsData.MESSAGE_AFTER_ADD
    }

    
 






}

module.exports = DynamicControlsPage;