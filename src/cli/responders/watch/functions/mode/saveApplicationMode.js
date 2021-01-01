const fs = require('fs');
const { writeFile } = require('../dataUtils/dataUtils');
const { applicationModeConfigFilePath, applicationDefaultMode } = require("../../constants");
const checkApplicationModeValue = require('./checkApplicationModeValue');

function saveApplicationMode(modeValue) {
    const allowWritingToFile =
        fs.existsSync(applicationModeConfigFilePath) &&
        checkApplicationModeValue(modeValue);
    if (allowWritingToFile) {
        writeFile(applicationModeConfigFilePath, modeValue);
    } else {
        setDefaultApplicationMode();
    }
}

function setDefaultApplicationMode() {
    writeFile(applicationModeConfigFilePath, applicationDefaultMode);
}

module.exports = {
    saveApplicationMode:saveApplicationMode,
    setDefaultApplicationMode: setDefaultApplicationMode
}