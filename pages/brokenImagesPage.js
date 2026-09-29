const BasePage = require('./basePage');
const { By } = require('selenium-webdriver');
const BrokenImagesData = require('../testData/brokenImagesData');
const Reporter = require('../utils/reporter');

class BrokenImagesPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            headerLocator : By.tagName("h3"),
            imagesLocator : By.xpath("//div[@class='example']//img"),
            footerLocator : By.xpath("//div[@style='text-align: center;']"),
            linkLocator : By.xpath("//a[@target='_blank']")

        }
    }

    async isBrokenImagesPageLoaded() {
        return await this.driver.executeScript("return document.readyState === 'complete';");
    }

    async isHeaderDisplayed() {
        return await Reporter.step(`Observe the ${BrokenImagesData.HEADER} header is visible`, async () => {
            return this.isElementDisplayed(this.locators.headerLocator);
        });
    }

    async getImagesAmount() {
        return await Reporter.step(`Observe the ${BrokenImagesData.IMG_AMOUNT} img elements is visible`, async () => {
            const images = await this.findElements(this.locators.imagesLocator);
            return images.length
        });
    }

    async isFooterDisplayed() {
        return await Reporter.step(`Observe the ${BrokenImagesData.FOOTER} footer is visible`, async () => {
            return this.isElementDisplayed(this.locators.footerLocator);
        });
        }

    async isLinkDisplayed() {
        return await Reporter.step(`Observe the ${BrokenImagesData.LINK} link is visible`, async () => {
            return this.isElementDisplayed(this.locators.linkLocator);
        });
        }

    async isImgDisplayedCorrectly(ImgNumber) {
            const targetImg = this.findElementsByNumber(this.locators.imagesLocator, ImgNumber);
            return this.isElementDisplayedCorrectly(`Image ${ImgNumber}`, targetImg);
        
        }


}

module.exports = BrokenImagesPage;