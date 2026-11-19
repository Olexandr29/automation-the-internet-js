const {BASE_URL} = require('../config/testConfig');

const BrokenImagesData = {
    URL : `${BASE_URL}broken_images`,
    HEADER : "Broken Images",
    IMG_AMOUNT: 3,
    FOOTER : "Powered by Elemental Selenium",
    LINK : "Elemental Selenium"
}

module.exports = BrokenImagesData;