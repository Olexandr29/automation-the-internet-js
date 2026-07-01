const { WebDriver, until } = require("selenium-webdriver")

class BasePage{
    constructor(driver) {
        this.driver = driver;
        this.wait = (condition, timeout = 5000) => this.driver.wait(condition, timeout);

    }

    async find(locator) {
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 5000);
        return element;
    }

    async click(locator) {
        const element = await this.find(locator);
        await element.click()
        return element;
    }

    async type(locator, text) {
        const element = await this.find(locator);
        await element.clear();
        await element.sendKeys(text);
        return element;
    }

    async getText(locator) {
        const element = await this.find(locator);
        return await element.getText();
    }

    async isBtnDisplayed(locator) {
        try {
            const element = await this.find(locator);
            return await element.isDisplayed();
        } catch (error) {
            console.error(`the button ${locator} is not visible`);
            return false;
        }    
    }

    async waitForUrlContains(path) {
        await this.wait(until.urlContains(path), 5000);
    }

}
module.exports = BasePage