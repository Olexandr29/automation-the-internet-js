const HomePage = require('../pages/homePage');
const { createDriver, closeDriver } = require('./testSetup');
const DynamicControlsPage = require('../pages/dynamicControlsPage')
const assert = require('assert');
const DynamicControlsData = require('../testData/dynamicControlsData');

describe("Dynamic Controls test suite", function() {
    let driver;
    let homePage; 
    /**@type {DynamicControlsPage} */
    let dynamicControlsPage;

beforeEach(async function() {
    driver = await createDriver();
    homePage = new HomePage(driver);
    dynamicControlsPage = await homePage.openDynamicControlsPage();
});

afterEach(async function(){
await closeDriver(driver, this.currentTest);
});

it("TC38 - Verify page content", async function() {
    assert.strictEqual(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/dynamic_controls")
    assert.strictEqual(await dynamicControlsPage.isSpecificPageLoaded(), true, "The page is not completely loaded");
    assert.strictEqual(await dynamicControlsPage.isHeaderDisplayed(), true, `The page header '${DynamicControlsData.HEADER}' is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isParagraphDisplayed(), true, "The content of the paragraph is not correct");
    assert.strictEqual(await dynamicControlsPage.isCheckboxSectionSubheaderDisplayed(), true, `The subheader of checkbox section with text '${DynamicControlsData.SUBHEADER_OF_CHECKBOX_SECTION}' is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isChecboxDisplayed(), true, `The checkbox title is not the '${DynamicControlsData.CHECKBOX_TITLE}'`)
    assert.strictEqual(await dynamicControlsPage.isRemoveButotnDisplayed(), true, `The button '${DynamicControlsData.REMOVE_BTN_TITLE}' is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isInputSubheaderDisplayed(), true, `The subheader of input section with text '${DynamicControlsData.SUBHEADER_OF_CHECKBOX_SECTION}' is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isInputFieldDisplayed(), true, "The input field is not displayed");
    assert.strictEqual(await dynamicControlsPage.isEnableButtonDisplayed(), true, `The '${DynamicControlsData.ENABLE_BTN_TITLE}' button is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isFooterDisplayed(), true, `The footer '${DynamicControlsData.FOOTER}' is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isSeleniumLinkDisplayed(), true, `The link ${DynamicControlsData.SELENIUM_TEXT} is not displayed`);
    assert.strictEqual(await dynamicControlsPage.isSauceLabsLinkDisplayed(), true, `The link ${DynamicControlsData.SAUCE_LABS_TEXT} is not displayed`);
});

it("TC39 - Verify checkbox initial state and changes", async function() {
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, "The initial state of the checkbox is wrong");
await dynamicControlsPage.clickOnCheckbox()
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), true, "The checkbox is not checked afer click");
await dynamicControlsPage.clickOnCheckbox()
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), false, "The checkbox is not unchecked after second click");
});

it.only("TC40 - Remove and add checkbox", async function() {
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, "The initial state of the checkbox is wrong");
assert.strictEqual(await dynamicControlsPage.getCheckboxTextWithLocatorCheckboxContainer(), DynamicControlsData.CHECKBOX_TITLE, "the title is not the same")
await dynamicControlsPage.debugCheckboxHtml()
await dynamicControlsPage.clickOnRemoveBtn();
assert.strictEqual(await dynamicControlsPage.isWaitTxtDisplayed(), true, `The text "${DynamicControlsData.WAIT_TEXT}" is not displayed, but displayed - "${await dynamicControlsPage.getWaitText()}"`);
assert.strictEqual(await dynamicControlsPage.isProgressBarDisplayed(), true, "The progress bar is not displayed");
assert.strictEqual(await dynamicControlsPage.isCheckboxAbsentOrHidden(), true, "The checkbox is not removed and now displayed at the page");
assert.notStrictEqual(await dynamicControlsPage.getBtnTxtInCheckboxSection(), DynamicControlsData.REMOVE_BTN_TITLE, "The button title is not changed");
assert.strictEqual(await dynamicControlsPage.getBtnTxtInCheckboxSection(), DynamicControlsData.ADD_BTN_TITLE, `The button title is not ${DynamicControlsData.ADD_BTN_TITLE}`);
assert.strictEqual(await dynamicControlsPage.isMsgAfterRemoveDisplayed(), true, `The message ${DynamicControlsData.MESSAGE_AFTER_REMOVE} is not displayed, but displayed - '${await dynamicControlsPage.getMsgAfterRemove()}'`);
await dynamicControlsPage.clickOnAddBtn();
assert.strictEqual(await dynamicControlsPage.isWaitTextAndProgressBarDisplayed(), true, `The text '${DynamicControlsData.WAIT_TEXT}' and progress bar are not displayed`);
assert.strictEqual(await dynamicControlsPage.isChecboxDisplayed(), true, "The checkbox is not displayed");
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), false, "The checkbox is not uncheked");
assert.strictEqual(await dynamicControlsPage.isBtnTxtChangedFromAddToRemove(), true, `The button title is not = '${DynamicControlsData.REMOVE_BTN_TITLE}' but = ${await dynamicControlsPage.getBtnTxtInCheckboxSection()}`)
assert.strictEqual(await dynamicControlsPage.isMsgAfterAddDisplayed(), true, `The text "${DynamicControlsData.MESSAGE_AFTER_REMOVE}" is not changed to "${DynamicControlsData.MESSAGE_AFTER_ADD}"`);
await dynamicControlsPage.debugCheckboxHtml()

});

});