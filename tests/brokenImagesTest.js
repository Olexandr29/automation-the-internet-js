const HomePage = require('../pages/homePage');
const { createDriver, closeDriver } = require('./testSetup');
const BrokenImagesPage = require('../pages/brokenImagesPage');
const assert = require('assert');
const Reporter = require('../utils/reporter');
const {allure} = require('allure-mocha/runtime');
const jsonAssertion = require('soft-assert');
const BrokenImagesData = require('../testData/brokenImagesData');

describe("Broken Images test suite", function () {
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
    assert.strictEqual(await driver.getCurrentUrl(), BrokenImagesData.URL, `The URL is not ${BrokenImagesData.URL}`);
    assert.strictEqual(await brokenImagesPage.isBrokenImagesPageLoaded(), true, "The document.readyState is not complete");
    assert.strictEqual(await brokenImagesPage.isHeaderDisplayed(), true, `The ${BrokenImagesData.HEADER} header is not displayed`);
    assert.strictEqual(await brokenImagesPage.getImagesAmount(), BrokenImagesData.IMG_AMOUNT, `The amount of 'img' files are not equal ${BrokenImagesData.IMG_AMOUNT}`);
    assert.strictEqual(await brokenImagesPage.isFooterDisplayed(), true, `The footer text ${BrokenImagesData.FOOTER} is not displayed`);
    assert.strictEqual(await brokenImagesPage.isLinkDisplayed(), true, `The ${BrokenImagesData.LINK} link is not displayed`);
});

it("TC37 - Verify image loading", async function() {
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(1), true, "The first image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(2), true, "The second image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssert(await brokenImagesPage.isImgDisplayedCorrectly(3), true, "The third image is not displayed correctly, the broken image indicator/missing image placeholder is displayed.");
    jsonAssertion.softAssertAll();
});

});