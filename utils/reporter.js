const Logger = require("../utils/logger");
let step;
if(process.env.ALLURE === "true") {
    ({ step } = require("allure-js-commons"));
    // ("allure-mocha");
}

class Reporter {
    static async step(name, action = async () => {}) {
        Logger.info(name);
        if(!step) {
            return await action();
        }
        return await step(name, action);
    }


}

module.exports = Reporter;
