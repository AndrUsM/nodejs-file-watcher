const path = require('path');

const baseDataPath = path.join(__dirname, 'data');
const currentFilesIdPath = path.resolve(baseDataPath, '.currentFilesID.dat');
const previousFilesIdPath = path.resolve(baseDataPath, '.previousFilesID.dat');

const applicationHistoryPath = path.resolve(baseDataPath, '.history.dat');

const applicationModeConfigFilePath = path.resolve(baseDataPath, '.mode.dat');
const applicationBrowserMode = 'browser';
const applicationConsoleMode = 'browser';
const applicationDefaultMode = 'both';
const applicationModeList = [
    applicationConsoleMode,
    applicationDefaultMode,
    applicationBrowserMode
];

module.exports = {
    currentFilesIdPath: currentFilesIdPath,
    previousFilesIdPath: previousFilesIdPath,
    applicationHistoryPath: applicationHistoryPath,

    applicationBrowserMode: applicationBrowserMode,
    applicationConsoleMode: applicationConsoleMode,
    applicationDefaultMode: applicationDefaultMode,
    applicationModeList: applicationModeList,

    applicationModeConfigFilePath: applicationModeConfigFilePath
}