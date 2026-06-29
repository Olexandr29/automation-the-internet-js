const {By} = require('selenium-webdriver')

class SecurePage{
    constructor(driver) {
        this.driver = driver
        this.URL = "https://the-internet.herokuapp.com/secure";
        this.locators = {
            alert : By.id("flash"),
            welcomeMsg : By.className("subheader"),
            logoutBtn : By.className("button secondary radius")

        }
    }

    async getAlertMessage(){
        const alertMsgEl = await this.driver.findElement(this.locators.alert);
        const textMsg = await alertMsgEl.getText();
        console.log(textMsg)
        return textMsg
    }

    async getWelcomeMessage(){
        const alertMsgEl = await this.driver.findElement(this.locators.welcomeMsg);
        const textMsg = await alertMsgEl.getText();
        console.log(textMsg)
        return textMsg
    }

    async isLogoutBtnDisplayed(){
     const buttons = await this.driver.findElements(this.locators.logoutBtn);
     console.log(`Found ${buttons.length} logout buttons`)
     if (buttons.length == 0) {
        return false;
     }
     for (let i = 0; i < buttons.length; i++){
        const result = await buttons[i].isDisplayed();
        console.log(`is logout btn displayed = ${result}`)
        if (result) {
            return true;
        }
     }   
     return false;
    }





    
}
module.exports = SecurePage