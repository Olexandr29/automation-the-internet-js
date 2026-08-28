const HomePage = require('../pages/homePage');
const DropdownPage = require('../pages/dropdownPage');
const DropdownData = require('../testData/dropdownData');
// const assert = require('assert');
const { createDriver, closeDriver, assert, allure, Reporter } = require("../tests/testSetup");
// const Reporter = require("../utils/reporter");
// const { allure } = require("allure-mocha/runtime");


describe("[Regression] Dropdown test suite", function() {
let driver;
let homePage, dropdownPage;

    beforeEach(async function() {
    await allure.feature("Dropdown");
    driver = await createDriver();
    await Reporter.step("Open Home page", async () => {
    homePage = new HomePage(driver);
    });
    await Reporter.step("Open Dropdown page", async () => {
    dropdownPage = await homePage.openDropdownPage();
    });

    });

    afterEach(async function() {
        await closeDriver(driver, this.currentTest);
    });

    it("[Smoke] TC21 - Verify default state", async function() {
        assert.strictEqual(await dropdownPage.isDropdownVisible(), true, "The dropdown is not visible.");
        assert.strictEqual( await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_DEFAULT, `The default selected value is not the '${DropdownData.OPTION_DEFAULT}'`);
    });

    it("[Smoke] TC22 - Verify all available options are displayed", async function() {
        await Reporter.step("Open Dropdown list with options", async () => {
            await dropdownPage.openDropdown(); 
        });
        const expectedOptionsArr = [DropdownData.OPTION_DEFAULT, DropdownData.OPTION_1, DropdownData.OPTION_2];
        const actualOptionsArr = await dropdownPage.getAllOptions();
        assert.deepStrictEqual(actualOptionsArr, expectedOptionsArr, `The displayed dropdown options don't match the expected list`);
    });

    it("[Smoke] TC23 - Select Option 1 using mouse", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected`);
    });

    it("[Smoke] TC24 - Verify option remains selected after reopening and closing", async function() {
        await Reporter.step("Open Dropdown list with options")

        await dropdownPage.selectOption(DropdownData.OPTION_2);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
        await Reporter.step("Open Dropdown again", async () => {
        await dropdownPage.openDropdownByPressEnter();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
        await Reporter.step("Close Dropdown", async () => {
        await dropdownPage.pressEscape();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
    });

    it("TC25 - Change selected option using keyboard arrow keys", async function() {
        await dropdownPage.makeDropdownFocused();
        assert.strictEqual(await dropdownPage.isDropdownFocused(), true, "The dropdown is not focused");
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected`);
        await Reporter.step("Change selected option using the keyboard", async () => {
        await dropdownPage.pressArrowDown();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The "${DropdownData.OPTION_2}"is not became selected after pressing Arrow Down`);
        await Reporter.step("Change selected option using the keyboard", async () => {
        await dropdownPage.pressArrowUp();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The "${DropdownData.OPTION_1}"is not became selected after pressing Arrow Up`);
    });

    it("TC26 - Navigate, select and change the dropdown option using keyboard", async function() {
        await dropdownPage.makeDropdownFocused();
        assert.strictEqual(await dropdownPage.isDropdownFocused(), true, "The Dropdown is not focused");
        await Reporter.step("Open Dropdown", async () => {
        await dropdownPage.openDropdownByPressEnter();
        });
        const expectedOptionsArr = [DropdownData.OPTION_DEFAULT, DropdownData.OPTION_1, DropdownData.OPTION_2];
        const actualOptionsArr = await dropdownPage.getAllOptions();
        assert.deepStrictEqual(actualOptionsArr, expectedOptionsArr, `The displayed dropdown options don't match the expected list`);
        await Reporter.step("Select Option 1 using the keyboard", async () => {
        await dropdownPage.pressArrowDown();
        await dropdownPage.openDropdownByPressEnter();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected after pressing Arrow Down and Enter`);
        await Reporter.step("Change selected option to Option 2 using the keyboard", async () => {
        await dropdownPage.pressArrowDown();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The "${DropdownData.OPTION_2}"is not became selected after pressing Arrow Down`);
        await Reporter.step("Select Option 1 using the keyboard", async () => {
        await dropdownPage.pressArrowUp();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The "${DropdownData.OPTION_1}"is not became selected after pressing Arrow Up`);
    });

    it("TC27 - Verify the Arrow Up and Down on the first and last options", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected`);
        await dropdownPage.pressArrowUp();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The selected value '${DropdownData.OPTION_1}' should not be changed`);
        await dropdownPage.selectOption(DropdownData.OPTION_2);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The '${DropdownData.OPTION_2}' is not selected`);
        await dropdownPage.pressArrowDown();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The selected value '${DropdownData.OPTION_2}' should not be changed`);
    });

    it("[Smoke] TC28 - Verify only one option can be selected at a time", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The '${DropdownData.OPTION_1}' is not selected`);
        await dropdownPage.selectOption(DropdownData.OPTION_2);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `Only the '${DropdownData.OPTION_2}' should be selected at a time`);
    });

    it("TC29 - Verify selected option after refresh", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The '${DropdownData.OPTION_1}' is not selected`);
        await Reporter.step("Refresh the page", async () => {
        await driver.navigate().refresh();
        });
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_DEFAULT, `The default value "${DropdownData.OPTION_DEFAULT}" should be selected`);
    });

    it("TC30 - Verify browser Back and Forward navigation behaviour", async function () {
        await dropdownPage.selectOption(DropdownData.OPTION_2);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`);
        await Reporter.step("Navigate Back", async () => {
        await driver.navigate().back();
        });
        assert.strictEqual(await driver.getCurrentUrl(), HomePage.URL, "The Home page is not opened");
        homePage = new HomePage(driver);
        assert.strictEqual(await homePage.isDropdownLinkVisible(), true, "The Dropdown link is not visible");
        await Reporter.step("Navigate Forward", async () => {
        await driver.navigate().forward();
        });
        dropdownPage = new DropdownPage(driver);
        assert.strictEqual(await driver.getCurrentUrl(), DropdownData.URL, "The Dropdown page is not opened");
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} should be selected after returning to dropdown page`);
    });


})