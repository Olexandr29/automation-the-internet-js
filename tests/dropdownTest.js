const HomePage = require('../pages/homePage');
const DropdownPage = require('../pages/dropdownPage');
const DropdownData = require('../testData/dropdownData');
const assert = require('assert');
const {createDriver, closeDriver} = require("../tests/testSetup");

describe("Dropdown test suite", function() {
let driver;
let homePage, dropdownPage;

    beforeEach(async function() {
    driver = await createDriver();
    homePage = new HomePage(driver);
    dropdownPage = await homePage.openDropdownPage();
    });

    afterEach(async function() {
        await closeDriver(driver, this.currentTest);
    });

    it("TC21 - Verify default state", async function() {
        assert.strictEqual(await dropdownPage.isDropwdownVisible(), true, "The dropdown is not visible.");
        assert.strictEqual( await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_DEFAULT, `The default selected value is not the '${DropdownData.OPTION_DEFAULT}'`);
    });

    it("TC22 - Verify all available options are displayed", async function() {
        const expectedOptionsArr = [DropdownData.OPTION_DEFAULT, DropdownData.OPTION_1, DropdownData.OPTION_2];
        const actualOptionsArr = await dropdownPage.getAllOptions();
        assert.deepStrictEqual(actualOptionsArr, expectedOptionsArr, `The displayed dropdown options don't match the expected list`);
    });

    it("TC23 - Select Option 1 using mouse", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected`);
    });

    it("TC24 - Verify option remains selected after reopening and closing", async function() {
        await dropdownPage.selectOption(DropdownData.OPTION_2);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
        await dropdownPage.openDropdownByPressEnter();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
        await dropdownPage.pressEscape();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The ${DropdownData.OPTION_2} is not selected`)
    });

    it("TC25 - Change selected option using keyboard arrow keys", async function() {
        await dropdownPage.makeDropdownFocused();
        assert.strictEqual(await dropdownPage.isDropdownFocused(), true, "The dropdown is not focused");
        await dropdownPage.selectOption(DropdownData.OPTION_1);
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The ${DropdownData.OPTION_1} is not selected`);
        await dropdownPage.pressArrowDown();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_2, `The "${DropdownData.OPTION_2}"is not became selected after pressing Arrow Down`);
        await dropdownPage.pressArrowUp();
        assert.strictEqual(await dropdownPage.getSelectedDropdownText(), DropdownData.OPTION_1, `The "${DropdownData.OPTION_1}"is not became selected after pressing Arrow Up`);
    });




})