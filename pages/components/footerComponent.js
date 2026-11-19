const {By} = require('selenium-webdriver');
const DynamicControlsData = require("../../testData/dynamicControlsData");
const BasePage = require("../basePage");

class FooterComponent extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
        footer : By.xpath("//div[@style='text-align: center;']"),
        seleniumLink : By.linkText("Elemental Selenium"),
        sauceLabsLnik : By.linkText("Sauce Labs")
        }
    }

  async isFooterDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.footer) &&
            (await this.getText(this.locators.footer) === DynamicControlsData.FOOTER)
        )
    }

    async isSeleniumLinkDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.seleniumLink) &&
            (await this.getText(this.locators.seleniumLink) === DynamicControlsData.SELENIUM_TEXT)
        )
    }

    async isSauceLabsLinkDisplayed() {
        return (
            await this.isElementDisplayed(this.locators.sauceLabsLnik) &&
            (await this.getText(this.locators.sauceLabsLnik) === DynamicControlsData.SAUCE_LABS_TEXT)
        )
    }



}

module.exports = FooterComponent;