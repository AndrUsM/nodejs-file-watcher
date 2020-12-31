const fs = require('fs');
const { writeFile } = require('../dataUtils/dataUtils');
const { applicationModeConfigFilePath, applicationDefaultMode } = require("../../constants");
const checkApplicationModeValue = require('./checkModeValue');
const setDefaultApplicationMode = require('./setDefaultMode');

function saveApplicationModeValueToFile(modeValue) {
    const allowWritingToFile =
        fs.existsSync(applicationModeConfigFilePath) &&
        checkApplicationModeValue(modeValue);
    if (allowWritingToFile) {
        writeFile(applicationModeConfigFilePath, modeValue);
    } else {
        setDefaultApplicationMode();
    }
}

module.exports = saveApplicationModeValueToFile