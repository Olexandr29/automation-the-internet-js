const HomePage = require('../pages/homePage');
const CheckboxPage = require('../pages/checkboxPage');
const { createDriver, closeDriver } = require('./testSetup');
const assert = require('assert')
const CheckboxData = require('../testData/checkboxData');

describe("[Regression] Checkbox test suite", function() {
    let driver;
    let homePage, checboxPage;

    beforeEach(async function() {
        driver = await createDriver();
        homePage = new HomePage(driver);
    });

    afterEach(async function() {
        await closeDriver(driver, this.currentTest);
    });

    it("[Smoke] TC31 - Verify Checkboxes are visible", async function() {
        checboxPage = await homePage.openCheckboxPage();
        assert.strictEqual(await driver.getCurrentUrl(), CheckboxData.URL, "The Checkboxes page is not opened");
        assert.strictEqual(await checboxPage.isCheckboxVisible(1), true, `The ${CheckboxData.CHECKBOX_1} is not visible`);
        assert.strictEqual(await checboxPage.isCheckboxVisible(2), true, `The ${CheckboxData.CHECKBOX_2} is not visible`);
    })
    
})