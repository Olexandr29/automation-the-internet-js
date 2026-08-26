const { until, Key } = require("selenium-webdriver");
const Reporter = require("../utils/reporter");
const getKeyName = key =>
    Object.keys(Key).find(name => Key[name] === key) ?? key;

// function getKeyName(key) {

//     const keyNames = Object.keys(Key);

//     const result = keyNames.find(function(name) {
//         return Key[name] === key;
//     });

//     if (result === undefined || result === null) {
//         return key;
//     }

//     return result;
// }

class BasePage{
    constructor(driver) {
        this.driver = driver;
        this.wait = (condition, timeout = 5000) => 
            this.driver.wait(condition, timeout);

    }

    async find(locator) {
        await this.driver.wait(until.elementLocated(locator), 5000);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 5000);
        return element;
    }

    async findElements(locator) {
        await this.driver.wait(until.elementLocated(locator), 5000);
        const elements = await this.driver.findElements(locator);
        await this.driver.wait(until.elementIsVisible(elements), 5000);
        return elements;
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

    async pressKey(locator, specificKey) {
        await Reporter.step(`Press ${getKeyName(specificKey)} key`, async () => {

        const element = await this.find(locator);
        await element.sendKeys(specificKey);
        });
    }
    

}
module.exports = BasePage