
const LoginData = {
    validUsername : "tomsmith",
    validPassword : "SuperSecretPassword!",
    invalidUsername : "just_name",
    invalidPassword : "1p5T61",
    sqlInjection : "' OR '1'='1",
    xssInjection : "<script>alert('xss')</script>",
    successAlertMessage : "You logged into a secure area!",
    welcomeMessage : "Welcome to the Secure Area. When you are done click logout below.",
    expectedAlertUsernameMsg : "Your username is invalid!",
    expectedAlertPasswordMsg : "Your password is invalid!",
    expectedLogoutMsg : "You logged out of the secure area!",
    expectedLoginLogoutMsg : "You must login to view the secure area!"
}
module.exports = LoginData