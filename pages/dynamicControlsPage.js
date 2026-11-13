const BasePage = require('../pages/basePage');
const { By, until, Key } = require('selenium-webdriver');
const DynamicControlsData = require('../testData/dynamicControlsData');

class DynamicControlsPage extends BasePage {
    constructor(driver) {   
        super(driver);

    this.locators = {
        header : By.xpath("//div[@class='example']//h4"),
        paragraph : By.tagName("p"),
        checkboxSectionSubheader : By.xpath("//h4[text()='Remove/add']"),
        checkbox : By.id("checkbox"),
        checkboxForClick : By.xpath("//input[@type='checkbox']"),
        checkboxContainer : By.xpath("//form[@id='checkbox-example']//div[.//input[@type='checkbox']]"),
        buttonInCheckboxSection : By.xpath("//form[@id='checkbox-example']//button"),
        removeBtn : By.xpath("//button[text()='Remove']"),
        addBtn : By.xpath("//button[text()='Add']"),
        waitTxt : By.xpath("//div[@id='loading']"),
        progressBar : By.xpath("//img[@src='/img/ajax-loader.gif']"),
        txtFromRemovedCheckbox : By.xpath("//div[text()=' A checkbox']"),
        messageInCheckboxSection : By.xpath("//form[@id='checkbox-example']//p[@id='message']"),
        inputSectionSubheader : By.xpath("//h4[text()='Enable/disable']"),
        inputField : By.xpath("//input[@type='text']"),
        buttonInInputSection : By.xpath("//form[@id='input-example']//button"),
        enableBtn : By.xpath("//button[text()='Enable']"),
        disableBtn : By.xpath("//button[text()='Disable']"),
        messageInInputSection : By.xpath("//form[@id='input-example']//p[@id='message']"),
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

    async waitUntilCheckboxisEnabled() {
        return await this.waitUntilElementIsEnabled(this.locators.checkboxForClick)
    }

    async isChecboxDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.checkboxContainer) 
            &&
            (await this.getCheckboxText() === DynamicControlsData.CHECKBOX_TITLE)
        )
    }

    async getCheckboxText() {
        return await this.getText(this.locators.checkboxContainer);
    }

    async isCheckboxChecked() {
        return (await this.find(this.locators.checkboxForClick)).isSelected()
    }

    async clickOnCheckbox() {
        return await this.click(this.locators.checkboxForClick)
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

    async getTxtFromRemovedCheckbox() {
        return await this.getText(this.locators.txtFromRemovedCheckbox)
    }

    async isCorrectTxtDisplayedAfterRemoveCheckbox() {
        return await this.isElementDisplayed(this.locators.txtFromRemovedCheckbox) &&
        (await this.getTxtFromRemovedCheckbox() === DynamicControlsData.CHECKBOX_TITLE)
    }

    async getAmountOfDisplayedTxtFromChekbox() {
        const txtElements = await this.findElements(this.locators.txtFromRemovedCheckbox)
        return txtElements.length
    }

    async waitUntilInputIsEnabled() {
        return await this.waitUntilElementIsEnabled(this.locators.inputField);
    }
    
    async isInputFieldEnabled() {
        const inputFieldEl = await this.find(this.locators.inputField)
        return await inputFieldEl.isEnabled();
    }

     async clickOnEnableBtn() {
        return await this.click(this.locators.enableBtn)
    }

     async getBtnTxtInInputSection() {
        return await this.getText(this.locators.buttonInInputSection)
    }

    async isBtnTxtChangedFromEnableToDisable() {
        return await this.getBtnTxtInInputSection() !== DynamicControlsData.ENABLE_BTN_TITLE &&
        await this.getBtnTxtInInputSection() === DynamicControlsData.DISABLE_BTN_TITLE
    }

    async getMsgAfterEnable() {
        return await this.getText(this.locators.messageInInputSection) 
    }

    async isMsgAfterEnableDisplayed() {
        return await this.isElementDisplayed(this.locators.messageInInputSection) &&
        await this.getMsgAfterEnable() === DynamicControlsData.MESSAGE_AFTER_ENABLE
    }

    async enterValueIntoInputField(value) {
        return await this.type(this.locators.inputField, value);
    }

    async getEnteredTextFromInputField() {
        return await this.getAttributeValue(this.locators.inputField)
    }

    async clickOnDisableBtn() {
        return await this.click(this.locators.disableBtn)
    }

     async isBtnTxtChangedFromDisableToEnable() {
        const button = await this.find(this.locators.buttonInInputSection);
        await this.wait(until.elementTextIs(button, DynamicControlsData.ENABLE_BTN_TITLE));
        return await this.getBtnTxtInInputSection() === DynamicControlsData.ENABLE_BTN_TITLE &&
        await this.getBtnTxtInInputSection() !== DynamicControlsData.DISABLE_BTN_TITLE
    }

    async getMsgAfterDisable() {
        return await this.getText(this.locators.messageInInputSection) 
    }

     async isMsgAfterDisableDisplayed() {
        return await this.isElementDisplayed(this.locators.messageInInputSection) &&
        await this.getMsgAfterDisable() === DynamicControlsData.MESSAGE_AFTER_DISABLE
    }

    async waitUntilInputDisabled() {
        return await this.waitUntilElementIsDisabled(this.locators.inputField);
    }

    async isCorrectEnteredTextDisplayed(enteredText) {
        return await this.isElementDisplayed(this.locators.inputField) &&
        (await this.getEnteredTextFromInputField() === enteredText);
    }

    async focusCheckbox() {
        const targetCheckbox = await this.find(this.locators.checkboxForClick);
        return await this.focusElementByTab(targetCheckbox, 10);
    }

    async isChedckboxFocused() {
        const targetCheckbox = await this.find(this.locators.checkboxForClick);
        return await this.isElementFocused(targetCheckbox);
    }

    async pressSpaceToCheckUncheckCheckbox() {
        return await this.pressKey(this.locators.checkboxForClick, Key.SPACE);
    }

    async focusRemoveBtn() {
        const targetRemoveBtn = await this.find(this.locators.removeBtn);
        return await this.focusElementByTab(targetRemoveBtn, 10);
    }

    async isRemoveBtnFocused() {
        const targetRemoveBtn = await this.find(this.locators.removeBtn);
        return await this.isElementFocused(targetRemoveBtn);
    }

     async pressEnterOnRemoveBtn() {
        return await this.pressKey(this.locators.removeBtn, Key.ENTER);
    }

     async focusAddBtn() {
        const targetAddBtn = await this.find(this.locators.addBtn);
        return await this.focusElementByTab(targetAddBtn, 10);
    }

    async isAddBtnFocused() {
        const targetAddBtn = await this.find(this.locators.addBtn);
        return await this.isElementFocused(targetAddBtn);
    }

    async pressEnterOnAddBtn() {
        return await this.pressKey(this.locators.addBtn, Key.ENTER);
    }

    async focusEnableBtn() {
        const targetEnableBtn = await this.find(this.locators.enableBtn);
        return await this.focusElementByTab(targetEnableBtn, 10);
    }

    async isEnableBtnFocused() {
        const targetEnableBtn = await this.find(this.locators.enableBtn);
        return await this.isElementFocused(targetEnableBtn);
    }

    async pressEnterOnEnableBtn() {
        return await this.pressKey(this.locators.enableBtn, Key.ENTER);
    }

    async focusInputField() {
        const targetInputField = await this.find(this.locators.inputField);
        return await this.focusElementByTab(targetInputField, 10);
    }

    async isInputFieldFocused() {
        const targetInputField = await this.find(this.locators.inputField);
        return await this.isElementFocused(targetInputField);
    }



    async focusDisableBtn() {
        const targetDisableBtn = await this.find(this.locators.disableBtn);
        return await this.focusElementByTab(targetDisableBtn, 10);
    }

    async isDisableBtnFocused() {
        const targetDisableBtn = await this.find(this.locators.disableBtn);
        return await this.isElementFocused(targetDisableBtn);
    }

    async pressEnterOnDisableBtn() {
        return await this.pressKey(this.locators.disableBtn, Key.ENTER);
    }







    






}

module.exports = DynamicControlsPage;