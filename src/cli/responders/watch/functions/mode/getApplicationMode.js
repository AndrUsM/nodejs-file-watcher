const fs = require('fs');
const {
    readFile
} = require('../dataUtils/dataUtils');
const { applicationModeConfigFilePath, applicationDefaultMode } = require('../../constants');
const checkApplicationModeValue = require('./checkApplicationModeValue');
const { setDefaultApplicationMode } = require('./saveApplicationMode');

function getApplicationMode() {
    const _path = applicationModeConfigFilePath;
    const checkExistence = fs.existsSync(_path);

    if (checkExistence) {
        const mode = readFile(_path);
        if (checkApplicationModeValue(mode)) {
            return mode;
        } else {
            setDefaultApplicationMode();
            return applicationDefaultMode;
        }
    } else {
        setDefaultApplicationMode();
        return applicationDefaultMode;
    }
}

module.exports = getApplicationMode;