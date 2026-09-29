const HomePage = require('../pages/homePage');
const { createDriver, closeDriver } = require('./testSetup');
const BrokenImagesPage = require('../pages/brokenImagesPage');
const assert = require('assert');
const Reporter = require('../utils/reporter');
const {allure} = require('allure-mocha/runtime');
const jsonAssertion = require('soft-assert');

describe.only("Broken Images test suite", function () {
    let driver;
    let homePage, brokenImagesPage;

beforeEach(async function() {
    driver = await createDriver();
    homePage = new HomePage(driver);
    brokenImagesPage = await homePage.openBrokenImagesPage();
});

afterEach(async function() {
    await closeDriver(driver, this.currentTest);
});

it("TC36 - Verify page content", async function() {
    assert.strictEqual(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/broken_images", "URL is wrong");
    assert.strictEqual(await brokenImagesPage.isBrokenImagesPageLoaded(), true, "The document.readyState is not complete");
    assert.strictEqual(await brokenImagesPage.isHeaderDisplayed(), true, "The 'Broken Images' header is not displayed");
    assert.strictEqual(await brokenImagesPage.getImagesAmount(), 3, "The amount of `img` files are not 3");
    assert.strictEqual(await brokenImagesPage.isFooterDisplayed(), true, "The footer text 'Powered by Elemental Selenium' is not displayed");
    assert.strictEqual(await brokenImagesPage.isLinkDisplayed(), true, "The 'Elemental Selenium' link is not displayed");
});

it("TC37 - Verify image loading", async function() {
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(1), true, "The first image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(2), true, "The second image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(3), true, "The third image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssertAll();
});

});