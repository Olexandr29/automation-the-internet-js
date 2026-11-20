const {BASE_URL} = require('../config/testConfig');

const DynamicControlsData = {
    URL : `${BASE_URL}dynamic_controls`,
    HEADER : "Dynamic Controls",
    PARAGRAPH : "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.",
    SUBHEADER_OF_CHECKBOX_SECTION : "Remove/add",
    CHECKBOX_TITLE : "A checkbox",
    CHECKBOX_INITIAL_STATE : false,
    REMOVE_BTN_TITLE : "Remove",
    ADD_BTN_TITLE : "Add",
    MESSAGE_AFTER_REMOVE : "It's gone!",
    MESSAGE_AFTER_ADD : "It's back!",
    SUBHEADER_OF_INPUT_SECTION : "Enable/disable",
    ENABLE_BTN_TITLE : "Enable",
    DISABLE_BTN_TITLE : "Disable",
    WAIT_TEXT : "Wait for it...",
    INPUT_FIELD_INITIAL_STATE : false,
    MESSAGE_AFTER_ENABLE : "It's enabled!",
    MESSAGE_AFTER_DISABLE : "It's disabled!",
    INPUT_TEXT_MIXED_CASE : "Hello",
    INPUT_TEXT_ALPHANUMERIC_SPECIAL_CHARS : "Input123$",
    INPUT_TEXT_SPECIAL_CHAR_AT_START : "$And40"
}

module.exports = DynamicControlsData;