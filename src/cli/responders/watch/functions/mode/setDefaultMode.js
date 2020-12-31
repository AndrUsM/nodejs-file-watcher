const saveApplicationModeValueToFile = require("./saveModeValueToFile");
const { applicationDefaultMode } = require("../../constants");

function setDefaultApplicationMode() {
    saveApplicationModeValueToFile(applicationDefaultMode)
}

module.exports = setDefaultApplicationMode;