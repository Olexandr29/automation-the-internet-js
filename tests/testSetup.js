const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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
    await driver.get( "https://the-internet.herokuapp.com/");
    return driver;
    }

    async function closeDriver(driver, test) {
        if(driver) {
        await driver.quit();
        }
        console.log(`==========-========== The '${test.title}' => ${test.state} ==========-==========`)
    

    if (test.state == "failed" && test.err) {
        console.error("ERROR:");
        console.error(test.err);
    }
    
    };

    module.exports = {
        createDriver, closeDriver 
    };
    