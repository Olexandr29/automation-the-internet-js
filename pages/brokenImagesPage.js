const BasePage = require('./basePage');
const { By } = require('selenium-webdriver');

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
        return this.isElementDisplayed(this.locators.headerLocator);
    }

    async getImagesAmount() {
        const images = await this.findElements(this.locators.imagesLocator);
        console.log(`images.length =`, images.length);
        return images.length
    }

    async isFooterDisplayed() {
        return this.isElementDisplayed(this.locators.footerLocator);
    }

    async isLinkDisplayed() {
        return this.isElementDisplayed(this.locators.linkLocator);
    }


}

module.exports = BrokenImagesPage;