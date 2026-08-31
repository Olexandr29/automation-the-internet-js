const HomePage = require('../pages/homePage');
const { createDriver, closeDriver } = require('./testSetup');
const assert = require('assert');
const CheckboxData = require('../testData/checkboxData');
const Reporter = require('../utils/reporter');
const {allure} = require('allure-mocha/runtime');

describe.only("[Regression] Checkbox test suite", function () {
    let driver;
    let homePage, checkboxPage;

    beforeEach(async function () {
        await allure.feature("Checkbox");
        driver = await createDriver();
        await Reporter.step("Open Home page", async () => {
        homePage = new HomePage(driver);
        });
        await Reporter.step("Open Checkbox page", async () => {
        checkboxPage = await homePage.openCheckboxPage();
        });
    });

    afterEach(async function () {
        await closeDriver(driver, this.currentTest);
    });

    it("[Smoke] TC31 - Verify Checkboxes are visible", async function () {
        assert.strictEqual(await driver.getCurrentUrl(), CheckboxData.URL, "The Checkboxes page is not opened");
        assert.strictEqual(await checkboxPage.isCheckboxVisible(1), true, `The ${CheckboxData.CHECKBOX_1} is not visible`);
        assert.strictEqual(await checkboxPage.isCheckboxVisible(2), true, `The ${CheckboxData.CHECKBOX_2} is not visible`);
    });

    it("TC32 - Verify Checkboxes initial state", async function() {
        await Reporter.step("Observe the checkboxes initial state", async () => {
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), false, `The ${CheckboxData.CHECKBOX_1} is not unchecked`);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), true, `The ${CheckboxData.CHECKBOX_2} is not checked`);
        });
    });

    it("[Smoke] TC33 - Verify checkboxes state changes correctly", async function () {
        await checkboxPage.changeCheckboxState(1);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), true, `The ${CheckboxData.CHECKBOX_1} is not checked`);
        await checkboxPage.changeCheckboxState(1);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), false, `The ${CheckboxData.CHECKBOX_1} is not unchecked`);
        await checkboxPage.changeCheckboxState(2);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), false, `The ${CheckboxData.CHECKBOX_2} is not unchecked`);
        await checkboxPage.changeCheckboxState(2);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), true, `The ${CheckboxData.CHECKBOX_2} is not checked`);
    });

    it("TC34 - Verify checkboxes state after refresh", async function() {
        await checkboxPage.changeCheckboxState(1);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), true, `The ${CheckboxData.CHECKBOX_1} is not chacked`);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), true, `The ${CheckboxData.CHECKBOX_2} is not checked`);
        await Reporter.step("Refresh the page", async () => {
        await driver.navigate().refresh();
        });
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), false, `The ${CheckboxData.CHECKBOX_1} is checked`);
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), true, `The ${CheckboxData.CHECKBOX_2} is not checked`);
   
    });

    it("TC35 - Verify checkbox state chnges using keyboard", async function() {
        await checkboxPage.focusCheckbox(1);
        assert.strictEqual(await checkboxPage.isCheckboxFocused(1), true, `The checkbox 1 is not focused`);
        await checkboxPage.changeCheckboxStateBySpaceKey();
        assert.strictEqual(await checkboxPage.isCheckboxChecked(1), true, `The ${CheckboxData.CHECKBOX_1} is not checked`);
        await checkboxPage.focusCheckbox(2);
        assert.strictEqual(await checkboxPage.isCheckboxFocused(2), true, `The checkbox 2 is not focused`);
        await checkboxPage.changeCheckboxStateBySpaceKey();
        assert.strictEqual(await checkboxPage.isCheckboxChecked(2), false, `The ${CheckboxData.CHECKBOX_2} is not unchecked`);
    });

})