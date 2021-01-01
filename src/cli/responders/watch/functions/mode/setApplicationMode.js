const checkApplicationModeValue = require('./checkApplicationModeValue');
const saveApplicationMode = require('./saveApplicationMode');
const { setDefaultApplicationMode } = require('./saveApplicationMode');

function setApplicationMode(parameters) {
    const {
        mode
    } = parameters;
    const checkModeValue = checkApplicationModeValue(mode);
    if (checkModeValue)
        saveApplicationMode(mode);
    else
        setDefaultApplicationMode();
}



module.exports = setApplicationMode;