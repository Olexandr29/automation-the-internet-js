const {Builder} = require("selenium-webdriver");
const HomePage = require("../pages/homePage");
const LoginPage = require("../pages/loginPage");
const SecurePage = require("../pages/securePage");
const LoginData = require("../testData/loginData");
const assert = require('assert');
const loginTestData = [
    [ "TC2 - Unsuccessful login with empty credentials", "", "", LoginData.expectedAlertUsernameMsg ],
    [ "TC3 - Unsuccessful login with empty Password", LoginData.validUsername, "", LoginData.expectedAlertPasswordMsg ],
    [ "TC4 - Unsuccessful login with empty Username", "", LoginData.validPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC5 - Unsuccessful login with invalid Password", LoginData.validUsername, LoginData.invalidPassword, LoginData.expectedAlertPasswordMsg ],
    [ "TC6 - Unsuccessful login with invalid Username", LoginData.invalidUsername, LoginData.validPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC7 - Unsuccessful login with both Invalid Username and Password", LoginData.invalidUsername, LoginData.invalidPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC10 - Login with Username that has leading spaces", " " + LoginData.validUsername, LoginData.validPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC11 - Login with a Password that has leading spaces", LoginData.validUsername, " " + LoginData.validPassword, LoginData.expectedAlertPasswordMsg ],
    [ "TC12 - Login with a Username that has trailing spaces", LoginData.validUsername + " ", LoginData.validPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC13 - Login with a Password that has trailing spaces", LoginData.validUsername, LoginData.validPassword + " ", LoginData.expectedAlertPasswordMsg ],
    [ "TC14 - Login with a Username that has a different case", LoginData.validUsername.toUpperCase(), LoginData.validPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC15 - Login with a Password that has a different case", LoginData.validUsername, LoginData.validPassword.toUpperCase(), LoginData.expectedAlertPasswordMsg ],
    [ "TC16 - Login with SQL Injection in Username", LoginData.sqlInjection, LoginData.invalidPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC17 - Login with SQL Injection in Password", LoginData.validUsername, LoginData.sqlInjection, LoginData.expectedAlertPasswordMsg ],
    [ "TC18 - Login with XSS in Username", LoginData.xssInjection, LoginData.invalidPassword, LoginData.expectedAlertUsernameMsg ],
    [ "TC19 - Login with XSS in Password",LoginData.validUsername, LoginData.xssInjection,LoginData.expectedAlertPasswordMsg ]
];


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

     it("TC8 - Logout", async function() {
        securePage = await loginPage.successfulLogin(LoginData.validUsername, LoginData.validPassword);
        loginPage = await securePage.logout();
        assert.strictEqual(await driver.getCurrentUrl(), loginPage.URL, `User should be redirected to the Login page, but now on ${await driver.getCurrentUrl()}`);
        actualAlertMessage = await loginPage.getLogoutAlert();
        assert(actualAlertMessage.includes(LoginData.expectedLogoutMsg), `the alert message is wrong, but should be ${actualAlertMessage}`);
        assert.strictEqual(await loginPage.isLoginBtnDisplayed(), true, "The login button is not displayed");
    });

    it("TC9 - User cannot access the Secure Area after logout", async function(){
        securePage = await loginPage.successfulLogin(LoginData.validUsername, LoginData.validPassword);
        loginPage = await securePage.logout();
        assert(await loginPage.isLoginBtnDisplayed, true, "the login button should be displaye");
        await driver.navigate().back();
        await driver.navigate().refresh();
        const actualRes = await loginPage.getAlertAfterLogoutAndNavBack();
        assert(actualRes.includes(LoginData.expectedLoginLogoutMsg), `User should not be able to access the Secure Area and should got the message - ${LoginData.expectedLoginLogoutMsg} but got - ${actualRes}` );
        assert.strictEqual(await driver.getCurrentUrl(), loginPage.URL, `User should remains on the Login page but now on ${await driver.getCurrentUrl()}`);
        assert.strictEqual(await loginPage.isLoginBtnDisplayed(), true, "The Login button should be displayed")
    });

    it("TC20 - Password is masked", async function() {
        assert.strictEqual(await loginPage.isPasHidden(), true, "Password characters should be hidden");
        assert.strictEqual(await loginPage.isHiddenValueSaved(LoginData.invalidPassword), true, "The saved value should be equal to entered one");
    });

    loginTestData.forEach(function([testName, userName, pas, expectedMsg]) {
        it(testName, async function() {
            const actualAlertMessage = await loginPage.unsuccessfulLogin(userName, pas);
            assert(actualAlertMessage.includes(expectedMsg));
            assert.strictEqual(await driver.getCurrentUrl(), loginPage.URL, `user should be on Login page but now on ${await driver.getCurrentUrl()}`)
        })
    });

   
})