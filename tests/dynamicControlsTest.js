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

async function verifyStateAfterRemove() {
    // console.log("now will be the assertion of the 'isWaitTextAndProgressBarDisplayed' method");
    assert.strictEqual(await dynamicControlsPage.isWaitTextAndProgressBarDisplayed(), true, `The text "${DynamicControlsData.WAIT_TEXT}" or progress bar are not displayed`);
    // console.log("now will be the assertion of the 'isCheckboxAbsentOrHidden' method");
    assert.strictEqual(await dynamicControlsPage.isCheckboxAbsentOrHidden(), true, "The checkbox is not removed and now displayed at the page");
    // console.log("now will be the assertion of the 'isBtnTxtChangedFromRemoveToAdd' method");
    assert.strictEqual(await dynamicControlsPage.isBtnTxtChangedFromRemoveToAdd(), true, `The button title is not changes from '${DynamicControlsData.REMOVE_BTN_TITLE}' to '${DynamicControlsData.ADD_BTN_TITLE}`);
    // console.log("now will be the assertion of the 'isMsgAfterRemoveDisplayed' method");
    assert.strictEqual(await dynamicControlsPage.isMsgAfterRemoveDisplayed(), true, `The message ${DynamicControlsData.MESSAGE_AFTER_REMOVE} is not displayed, but displayed - '${await dynamicControlsPage.getMsgAfterRemove()}'`);
}

async function verifyStateAfterAdd() {
    // console.log("now will be the assertion of the 'isWaitTextAndProgressBarDisplayed' method");
    assert.strictEqual(await dynamicControlsPage.isWaitTextAndProgressBarDisplayed(), true, `The text '${DynamicControlsData.WAIT_TEXT}' and progress bar are not displayed`);
        // console.log("now will be the wait of the 'waitUntilCheckboxisEnabled' method");
    await dynamicControlsPage.waitUntilCheckboxisEnabled();
    //  console.log("now will be the assertion of the 'isChecboxDisplayed' method");
    assert.strictEqual(await dynamicControlsPage.isChecboxDisplayed(), true, "The checkbox is not displayed");
    // console.log("now will be the assertion of the 'isBtnTxtChangedFromAddToRemove' method");
    assert.strictEqual(await dynamicControlsPage.isBtnTxtChangedFromAddToRemove(), true, `The button title is not = '${DynamicControlsData.REMOVE_BTN_TITLE}' but = ${await dynamicControlsPage.getBtnTxtInCheckboxSection()}`)    
    // console.log("now will be the assertion of the 'isMsgAfterAddDisplayed' method");
    assert.strictEqual(await dynamicControlsPage.isMsgAfterAddDisplayed(), true, `The text "${DynamicControlsData.MESSAGE_AFTER_REMOVE}" is not changed to "${DynamicControlsData.MESSAGE_AFTER_ADD}"`);
}

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

it("TC40 - Remove and add checkbox", async function() {
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, "The initial state of the checkbox is wrong");
assert.strictEqual(await dynamicControlsPage.getCheckboxText(), DynamicControlsData.CHECKBOX_TITLE, "the title is not the same")
await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove()
await dynamicControlsPage.clickOnAddBtn();
await verifyStateAfterAdd()
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), false, "The checkbox is not uncheked");
});

it.only("TC41 -Remove and add checked checkbox", async function() {
    const startTime = Date.now();

    this.timeout(31000);
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, `The initial state of the checkbox should be unchecked`);

console.log("Step 2")
await dynamicControlsPage.clickOnCheckbox();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), true, "The checkbox is not became checked");

console.log("Step 3")
await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove();

console.log("Step 4")
await dynamicControlsPage.clickOnAddBtn();
await verifyStateAfterAdd();

console.log("Step 5")
await dynamicControlsPage.clickOnCheckbox();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), true, "The checkbox is not became checked");
await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove();
assert.strictEqual(await dynamicControlsPage.isCorrectTxtDisplayedAfterRemoveCheckbox(), true, ` Just text "${DynamicControlsData.CHECKBOX_TITLE}" should be displayed after removing checkbox`);

console.log("Step 6")
await dynamicControlsPage.clickOnAddBtn();
await verifyStateAfterAdd();

console.log("Step 7")
await dynamicControlsPage.clickOnCheckbox();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), true, "The checkbox is not became checked");
await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove();
assert.strictEqual(await dynamicControlsPage.getAmountOfDisplayedTxtFromChekbox(), 2, `The text "${DynamicControlsData.CHECKBOX_TITLE}" should be displayed 2 times at the page`);

console.log("Step 8")
await dynamicControlsPage.clickOnAddBtn();
await verifyStateAfterAdd();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), false, `The checkbox should be with unchecked state `);
assert.strictEqual(await dynamicControlsPage.getAmountOfDisplayedTxtFromChekbox(), 3, `The text "${DynamicControlsData.CHECKBOX_TITLE}" should be displayed 3 times at the page`);
console.log(`TC41 execution time: ${Date.now() - startTime} ms`);
});

it("TC42 -Enable and disable the Input field", async function() {
assert.strictEqual(await dynamicControlsPage.isInputFieldEnabled(), DynamicControlsData.INPUT_FIELD_INITIAL_STATE, "The initial state of the input field should be disabled");

await dynamicControlsPage.clickOnEnableBtn();
assert.strictEqual(await dynamicControlsPage.isWaitTextAndProgressBarDisplayed(), true, `The text "${DynamicControlsData.WAIT_TEXT}" and progress bar are appeared`);
await dynamicControlsPage.waitUntilInputIsEnabled();
assert.strictEqual(await dynamicControlsPage.isInputFieldEnabled(), true, `The state of the input field should became enabled`);
assert.strictEqual(await dynamicControlsPage.isBtnTxtChangedFromEnableToDisable(), true, `The button title "${DynamicControlsData.ENABLE_BTN_TITLE}" should be changed to "${DynamicControlsData.DISABLE_BTN_TITLE}"`);
assert.strictEqual(await dynamicControlsPage.isMsgAfterEnableDisplayed(), true, `The text "${DynamicControlsData.MESSAGE_AFTER_ENABLE}" should appeared`);
});

it("TC43 - Verify checkbox section state after refresh", async function() {
await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove();

await driver.navigate().refresh();
assert.strictEqual(await dynamicControlsPage.isChecboxDisplayed(), true, "The Checkbox shold be displayed after refresh the page");
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, "The initial state of the checkbox = unchecked should be displayed");
assert.strictEqual(await dynamicControlsPage.isRemoveButotnDisplayed(), true, `The button title "${DynamicControlsData.REMOVE_BTN_TITLE}" should be displayed`);

await dynamicControlsPage.clickOnCheckbox();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), true, `The checkbox state should became cheked`);

await dynamicControlsPage.clickOnRemoveBtn();
await verifyStateAfterRemove();

await dynamicControlsPage.clickOnAddBtn();
await verifyStateAfterAdd();
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), false, `The checkbox should have unchecked state`);

await driver.navigate().refresh();
assert.strictEqual(await dynamicControlsPage.isChecboxDisplayed(), true, "The Checkbox shold be displayed after refresh the page");
assert.strictEqual(await dynamicControlsPage.isCheckboxChecked(), DynamicControlsData.CHECKBOX_INITIAL_STATE, "The initial state of the checkbox = unchecked should be displayed");
assert.strictEqual(await dynamicControlsPage.isRemoveButotnDisplayed(), true, `The button title "${DynamicControlsData.REMOVE_BTN_TITLE}" should be displayed`);
});

});