const checkApplicationModeValue = require('./checkModeValue');
const saveApplicationModeValueToFile = require('./saveModeValueToFile');
const setDefaultApplicationMode = require('./setDefaultMode');

function setApplicationMode(parameters) {
    const {
        mode
    } = parameters;
    if (checkModeValue) {
        checkApplicationModeValue(mode) ?
            saveApplicationModeValueToFile(mode) :
            setDefaultApplicationMode();
    } else {
        setDefaultApplicationMode();
    }
}

module.exports = setApplicationMode;