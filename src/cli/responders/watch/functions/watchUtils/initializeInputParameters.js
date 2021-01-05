const os = require('os');
const fs = require('fs');
const path = require('path');
const destructureLine = require("./destructureLine");
const { applicationModeList, applicationDefaultMode } = require('../../constants');

function initializeApplicationMode(splitedLine) {
    let applicationMode = splitedLine ? splitedLine[2] : applicationDefaultMode;
    applicationMode = destructureLine({
        line: applicationMode,
        type: 'string',
        field: 'mode',
        defaultValue: applicationDefaultMode,
        checkFunction: function (value) {
            return (
                typeof applicationModeList.find(item => item === value) === 'string'
            );
        }
    });
    return applicationMode;
}

function initializeWatchPath(splitedLine) {
    let folderPath = splitedLine ? splitedLine[1] : '';
    folderPath = destructureLine({
        line: folderPath,
        type: 'string',
        field: 'path',
        defaultValue: os.homedir(),
        generateValue: function (enteredPath) {
            return path.join(os.homedir(), enteredPath);
        },
        checkFunction: function (value) {
            return fs.existsSync(value);
        }
    });
    return folderPath;
}

module.exports = {
    initializeWatchPath: initializeWatchPath,
    initializeApplicationMode: initializeApplicationMode
}