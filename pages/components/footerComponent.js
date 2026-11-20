const {By} = require('selenium-webdriver');
const BasePage = require("../basePage");
const FooterData = require("../../testData/footerData");
const Reporter = require("../../utils/reporter");

class FooterComponent extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
        footer : By.xpath("//div[@style='text-align: center;']"),
        seleniumLink : By.linkText("Elemental Selenium"),
        sauceLabsLink : By.linkText("Sauce Labs")
        }
    }

  async isFooterDisplayed() {
        return await Reporter.step(`Observe is the footer visible`, async () => {
        return (
            await this.isElementDisplayed(this.locators.footer) &&
            (await this.getText(this.locators.footer) === FooterData.FOOTER)
        )
    });
    }

    async isSeleniumLinkDisplayed() {
        return await Reporter.step(`Observe is the '${FooterData.SELENIUM_TEXT}' link visible`, async () => {
        return (
            await this.isElementDisplayed(this.locators.seleniumLink) &&
            (await this.getText(this.locators.seleniumLink) === FooterData.SELENIUM_TEXT)
        )
    });
    }

    async isSauceLabsLinkDisplayed() {
        return await Reporter.step(`Observe is the '${FooterData.SAUCE_LABS_TEXT}' link visible`, async () => {
        return (
            await this.isElementDisplayed(this.locators.sauceLabsLink) &&
            (await this.getText(this.locators.sauceLabsLink) === FooterData.SAUCE_LABS_TEXT)
        )
    });
    }


}

module.exports = FooterComponent;