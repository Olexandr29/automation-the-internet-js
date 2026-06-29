const {Builder} = require("selenium-webdriver");
const HomePage = require("../pages/homePage");
const LoginPage = require("../pages/loginPage");
const SecurePage = require("../pages/securePage");
const LoginData = require("../testData/loginData");
const assert = require('assert');

describe("Login Test suit", function() {
let driver;
let homePage, loginPage, securePage;

    beforeEach(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/");
    homePage = new HomePage(driver);
    loginPage = await homePage.openLoginPage();
    });

    afterEach(async function() {
        await driver.quit();
    });

    it("TC1 - Successful login", async function(){
        securePage = await loginPage.successfulLogin(LoginData.validUsername, LoginData.validPassword);
        assert.strictEqual(await driver.getCurrentUrl(), securePage.URL, `The user is not redirected to the Secure Page and the current URL is ${await driver.getCurrentUrl()}`);
        const actualAlertMessage = await securePage.getAlertMessage();
        assert(actualAlertMessage.includes(LoginData.successAlertMessage), `the alert message is wrong, and looks like that ${actualAlertMessage}`);
        const actualWelcomeMessage = await securePage.getWelcomeMessage();
        assert(actualWelcomeMessage.includes(LoginData.welcomeMessage), `the welcome message is wrong, and looks like that ${actualWelcomeMessage}`);
        assert.strictEqual(await securePage.isLogoutBtnDisplayed(), true, "the logout button is not displayed");
    });

    it("TC2 – Unsuccessful login with empty credentials", async function(){
        const actualAlertMessage = await loginPage.unsuccessfulLogin("", "");
        assert(actualAlertMessage.includes(LoginData.expectedAlertUsernameMsg), `the alert message is wrong, and looks like ${actualAlertMessage}`)
        assert.strictEqual(await driver.getCurrentUrl(), loginPage.URL, `user should be on Login page but now on ${await driver.getCurrentUrl()}`)
    })


})