const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const readFilesId = require('./functions/watchUtils/readFilesId');
const watchFolderRecursively = require('./functions/watchUtils/watchFolderRecursively');
const { clearFile } = require('./functions/dataUtils/dataUtils');
const watchFile = require('./functions/watchUtils/watchFile');
const { checkFsContent } = require('./functions/watchUtils/checkFileType');
const generateFileId = require('./functions/watchUtils/generateFileId');
const {
    appendFile
} = require('./functions/dataUtils/dataUtils');
const {
    currentFilesIdPath,
    previousFilesIdPath,
    applicationHistoryPath
} = require('./constants');

let initialization = true;

async function preInitialization() {
    if (initialization) {
        clearFile(currentFilesIdPath)
        clearFile(previousFilesIdPath);
        clearFile(applicationHistoryPath)
    }
}

// process.on('exit', (code) => {
//     console.log("Buy!");
//     preInitialization();
//     process.exit(1);
// })

function watchResponder(line) {
    const folderPath = line.split(' ')[1];
    preInitialization();
    switch (os.platform()) {
        case "linux": {
            watchFolderLinux(folderPath);
            break;
        }
        default:
        case "darwin":
        case "win32": {
            watchFolderWindows(folderPath);
            break;
        }
    }
}

function watchFolderLinux(folderPath) {
    let files = [];

    folderPath = path.join(os.homedir(), 'Pictures');
    const getFilesProcess = exec(`find ${folderPath} -type f`);

    const uploadFilesData = () => {
        initialization = false;
        const currentFSState = readFilesId('current');
        getFilesProcess.stdout.on('data', function (chunk) {
            if (checkFsContent(path.resolve(chunk)), 'file') {
                files.push(chunk);
            }
        });

        getFilesProcess.on('exit', (code, signal) => {
            files = files.join('').split('\n');

            const setPreviousIdentifiers = () => {
                // on start app create and clear service files
                if (initialization) {
                    clearFile(currentFilesIdPath)
                    clearFile(previousFilesIdPath);
                    clearFile(applicationHistoryPath)
                }
                else {
                    appendFile(previousFilesIdPath, currentFSState.toString());
                    clearFile(currentFilesIdPath);
                }
            }

            setPreviousIdentifiers();

            files.forEach(item => {
                if (item) {
                    const fileId = generateFileId(item, { whitespaces: true });
                    appendFile(currentFilesIdPath, fileId);
                    watchFile(item);
                }
            });
        })
    }
    watchFolderRecursively({
        initialization: initialization,
        folderPath: folderPath,
        uploadFilesData: uploadFilesData()
    });
}

function watchFolderWindows(folderPath) {
    return fs.watch(folderPath, { recursive: true });
}

module.exports = watchResponder;