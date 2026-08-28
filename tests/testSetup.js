const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const HomePage = require('../pages/homePage');
const { allure } = require('allure-mocha/runtime');
const Reporter = require("../utils/reporter");
const assert = require('assert');


async function createDriver() {
    const options = new chrome.Options();

    if(process.env.GITHUB_ACTIONS === "true") {
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    }
    const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
    await driver.get(HomePage.URL);
    return driver;
    }

    async function closeDriver(driver, test) {
        try {
        if(driver && test.state === "failed") {
            const img = await driver.takeScreenshot();
            await allure.attachment(
                "Failure screenshot",
                Buffer.from(img, "base64"),
                "image/png"
            );
        }
    } catch (e) {
        console.error("Screenshot failed:", e.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
        console.log(`==========-========== The '${test.title}' => ${test.state} ==========-==========`)
    
    if (test.state == "failed" && test.err) {
        console.error("ERROR:");
        console.error(test.err);
    }


    
    };

    module.exports = {
createDriver, closeDriver, assert, allure, Reporter
};
    