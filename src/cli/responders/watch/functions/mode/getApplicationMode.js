const fs = require('fs');
const {
    readFile
} = require('../dataUtils/dataUtils');
const { applicationModeConfigFilePath } = require('../../constants');
const checkApplicationModeValue = require('./checkModeValue');
const setDefaultApplicationMode = require('./setDefaultMode');
const handleApplicationMode = require('./handleApplicationMode');

function getApplicationMode(functions) {
    const _path = applicationModeConfigFilePath;
    const checkExistence = fs.existsSync(_path);

    if (checkExistence) {
        const mode = readFile(_path);
        if (checkApplicationModeValue(mode)) {
            handleApplicationMode(mode, functions)
        } else {
            setDefaultApplicationMode();
        }
    } else {
        setDefaultApplicationMode();
    }
}

module.exports = getApplicationMode;