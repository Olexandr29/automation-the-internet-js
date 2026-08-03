const HomePage = require('../pages/homePage');
const DropdownPage = require('../pages/dropdownPage');
const DropdownData = require('../testData/dropdwonData');
const assert = require('assert');
const {createDriver, closeDriver} = require("../tests/testSetup");

describe("Dropdown test suite", function() {
let driver;
let homePage, dropdwonPage;

    beforeEach(async function() {
    driver = await createDriver();
    homePage = new HomePage(driver);
    dropdwonPage = await homePage.openDropdwonPage();
    });

    afterEach(async function() {
        await closeDriver(driver, this.currentTest);
    });

    it("TC21 - Verify default state", async function() {
        assert.strictEqual(await dropdwonPage.isDropwdownVisible(), true, "The dropdown is not visible.");
        assert.strictEqual( await dropdwonPage.getSelectedDropdownText(), DropdownData.OPTION_DEFAULT, `The default selected value is not the '${DropdownData.OPTION_DEFAULT}'`);
    });


})