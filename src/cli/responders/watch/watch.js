const os = require('os');
const { clearFile } = require('./functions/dataUtils/dataUtils');

const {
    currentFilesIdPath,
    previousFilesIdPath,
    applicationHistoryPath,
    applicationModeConfigFilePath,
    applicationDefaultMode,
    applicationBrowserMode,
    applicationConsoleMode,
    watchFolderInfoPath,
} = require('./constants');
const defaultWatchFolder = require('./useCases/defaultWatchFolder');
const { watchFolderLinux } = require('./useCases/watchFolderLinux');
const setApplicationMode = require('./functions/mode/setApplicationMode');
const {
    initializeApplicationMode,
    initializeWatchPath
} = require('./functions/watchUtils/initializeInputParameters.js');
const {
    out,
    messageType
} = require('../../../lib/coloredOut/out');
const setWatchFolder = require('./functions/watchFolder/setWatchFolder');

let initialization = true;

function preInitialization() {
    if (initialization) {
        clearFile(applicationModeConfigFilePath);
        clearFile(currentFilesIdPath)
        clearFile(previousFilesIdPath);
        clearFile(applicationHistoryPath);
        clearFile(watchFolderInfoPath);
    }
    initialization = false;
}

function watchResponder(line) {
    const splitedLine = line.split(' ');

    if (splitedLine) {
        preInitialization();

        let folderPath = initializeWatchPath(splitedLine)
        let applicationMode = initializeApplicationMode(splitedLine);

        setApplicationMode({
            mode: applicationMode
        });
        setWatchFolder(folderPath, folderPath);

        if (!folderPath) {
            out('File or folder path is not defined!', messageType.warning);
        } else {
            _platformCases({
                folderPath: folderPath
            });
        }
    } else {
        const message = [
            'Watch responder must have',
            [
                'path:string',
                '<mode:string>'
            ].join(', '),
            'Mode has such values: ',
            [
                applicationDefaultMode,
                applicationBrowserMode,
                applicationConsoleMode
            ].join(', ')
        ].join(' ');
        out(
            message,
            messageType.error
        );
    }
}

function _platformCases(parameters) {
    let { folderPath, } = parameters;

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