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

});

afterEach(async function(){
await closeDriver(driver, this.currentTest);
});

it("TC38 - Verify page content", async function() {
    dynamicControlsPage = await homePage.openDynamicControlsPage();
    assert.strictEqual(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/dynamic_controls")
    assert.strictEqual(await dynamicControlsPage.isDynamicControlsPageLoaded(), true, "The page is not completely loaded");
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

});