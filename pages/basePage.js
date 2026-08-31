const { until, Key } = require("selenium-webdriver");
const Reporter = require("../utils/reporter");
const getKeyName = key =>
    Object.keys(Key).find(name => Key[name] === key) ?? key;
const DEFAULT_TIMEOUT_MS = 15000;


class BasePage{
    constructor(driver) {
        this.driver = driver;
        this.wait = (condition, timeout = DEFAULT_TIMEOUT_MS) => 
            this.driver.wait(condition, timeout);

    }

    async find(locator) {
        await this.wait(until.elementLocated(locator));
        const element = await this.driver.findElement(locator);
        await this.wait(until.elementIsVisible(element));
        return element;
    }

    async findElements(locator) {
        await this.wait(until.elementLocated(locator));
        const elements = await this.driver.findElements(locator);
        return elements;
    }

    async findElementsByNumber(locator, number) {
        const elements = await this.findElements(locator);
        return elements[number - 1];
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

    async isElementDisplayed(locator) {
        try {
            const element = await this.find(locator);
            return await element.isDisplayed();
        } catch (error) {
            console.error(`the element ${locator} is not visible`);
            return false;
        }    
    }

    async waitForUrlContains(path) {
        await this.wait(until.urlContains(path));
    }

    async pressKey(locator, specificKey) {
        await Reporter.step(`Press ${getKeyName(specificKey)} key`, async () => {
        const element = await this.find(locator);
        await element.sendKeys(specificKey);
        });
    }

    async focusElementByTab(targetElement, maxTabs = 10) {
        const targetElementId = await targetElement.getId();
        for (let i = 0; i < maxTabs; i++) {
            await this.driver.actions().sendKeys(Key.TAB).perform();
            const activeElement = await this.driver.switchTo().activeElement();
            const activeElementId = await activeElement.getId();           
            if (activeElementId === targetElementId) {
                return;
            }
        }
            throw new Error(`Element could not be focused using Tab`);
    }

    async isElementFocused(element) {
        const focusedElement = await this.driver.switchTo().activeElement();
        return ( (await focusedElement.getId()) === (await element.getId()) );
    }
    



}
module.exports = BasePage