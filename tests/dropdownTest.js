const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const HomePage = require('../pages/homePage');
const DropdownPage = require('../pages/dropdownPage');
const DropdownData = require('../testData/dropdwonData');
const assert = require('assert');


describe("Dropdown test suite", function() {
let driver;
let homePage, dropdwonPage;

    beforeEach(async function() {
        const options = new chrome.Options();
        if(process.env.GITHUB_ACTIONS === "true") {
            options.addArguments('--headless=new');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');    
        }
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get("https://the-internet.herokuapp.com/");
    homePage = new HomePage(driver);
    dropdwonPage = await homePage.openDropdwonPage();
    });

    afterEach(async function() {
        await driver.quit();
        console.log(`==========-========== The '${this.currentTest.title}' => ${this.currentTest.state} ==========-==========`)
    });

    it.only("TC21 - Verify default state", async function() {
        assert.strictEqual(await dropdwonPage.isDropwdownVisible(), true, "The dropdown is not visible.");
        assert.strictEqual( await dropdwonPage.getSelectedDropdownText(), DropdownData.OPTION_DEFAULT, `The default selected value is not the '${DropdownData.OPTION_DEFAULT}'`);
    });


})