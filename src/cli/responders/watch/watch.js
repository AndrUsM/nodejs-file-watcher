const os = require('os');
const { clearFile } = require('./functions/dataUtils/dataUtils');
const {
    currentFilesIdPath,
    previousFilesIdPath,
    applicationHistoryPath,
    applicationDefaultMode,
    applicationModeConfigFilePath
} = require('./constants');

const defaultWatchFolder = require('./useCases/defaultWatchFolder');
const watchFolderLinux = require('./useCases/watchFolderLinux');
const setApplicationMode = require('./functions/mode/setApplicationMode');

let initialization = true;

function preInitialization() {
    if (initialization) {
        clearFile(applicationModeConfigFilePath);
        clearFile(currentFilesIdPath)
        clearFile(previousFilesIdPath);
        clearFile(applicationHistoryPath)
    }
    initialization = false;
}

// process.on('exit', (code) => {
//     console.log("Buy!");
//     preInitialization();
//     process.exit(1);
// })

function watchResponder(line) {
    const splitedLine = line.split(' ');

    if (splitedLine) {
        const folderPath = splitedLine ? splitedLine[1] : '';

        const applicationMode = splitedLine ? splitedLine[2] : applicationDefaultMode;
        setApplicationMode({
            mode: applicationMode
        });

        if (folderPath) {
            console.log('File or folder path is not defined!');
        } else {
            _platformCases({
                initialization: initialization,
                folderPath: folderPath
            })
        }
    } else {
        console.log('Error')
    }
}

function _platformCases(parameters) {
    let {
        folderPath,
        initialization
    } = parameters;
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