const assert = require('assert');
const FooterData = require('../../testData/footerData');

async function verifyFooter(footer) {
    assert.strictEqual(await footer.isFooterDisplayed(), true, `The footer '${FooterData.FOOTER}' is not displayed`);
    assert.strictEqual(await footer.isSeleniumLinkDisplayed(), true, `The link ${FooterData.SELENIUM_TEXT} is not displayed`);
    assert.strictEqual(await footer.isSauceLabsLinkDisplayed(), true, `The link ${FooterData.SAUCE_LABS_TEXT} is not displayed`);
}

module.exports = { verifyFooter };