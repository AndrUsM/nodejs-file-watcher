const os = require('os');
const { clearFile } = require('./functions/dataUtils/dataUtils');

const {
    currentFilesIdPath,
    previousFilesIdPath,
    applicationHistoryPath,
    applicationModeConfigFilePath,
} = require('./constants');
const defaultWatchFolder = require('./useCases/defaultWatchFolder');
const watchFolderLinux = require('./useCases/watchFolderLinux');
const setApplicationMode = require('./functions/mode/setApplicationMode');
const {
    initializeApplicationMode,
    initializeWatchPath
} = require('./functions/watchUtils/initializeInputParameters.js')

let initialization = true;

function watchResponder(line) {
    const splitedLine = line.split(' ');

    if (splitedLine) {
        let folderPath = initializeWatchPath(splitedLine)
        let applicationMode = initializeApplicationMode(splitedLine);

        setApplicationMode({
            mode: applicationMode
        });

        if (!folderPath) {
            console.log('File or folder path is not defined!');
        } else {
            _platformCases({
                folderPath: folderPath
            });
        }
    } else {
        console.log('Error');
    }
}



function preInitialization() {
    if (initialization) {
        clearFile(applicationModeConfigFilePath);
        clearFile(currentFilesIdPath)
        clearFile(previousFilesIdPath);
        clearFile(applicationHistoryPath)
    }
    initialization = false;
}

function _platformCases(parameters) {
    let { folderPath, } = parameters;
    preInitialization();

    switch (os.platform()) {
        case "linux": {
            watchFolderLinux({
                folderPath: folderPath,
                initialization: initialization
            });
            break;
        }
        default:
        case "darwin":
        case "win32": {
            defaultWatchFolder(folderPath);
            break;
        }
    }
}

module.exports = watchResponder;