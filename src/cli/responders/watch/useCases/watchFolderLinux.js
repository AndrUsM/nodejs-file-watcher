const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const { readFilesId, readFilesIdType } = require('../functions/watchUtils/readFilesId');
const watchFolderRecursively = require('../functions/watchUtils/watchFolderRecursively');
const watchFile = require('../functions/watchUtils/watchFile');
const { checkFileContent, checkFileContentType } = require('../functions/watchUtils/checkFileType');
const generateFileId = require('../functions/watchUtils/generateFileId');
const {
    appendFile
} = require('../functions/dataUtils/dataUtils');
const {
    currentFilesIdPath,
    previousFilesIdPath,
} = require('../constants');

function setPreviousIdentifiers() {
    const currentFSState = readFilesId(readFilesIdType.current);
    appendFile(previousFilesIdPath, currentFSState.toString());
}

function watchFolderLinux(parameters) {
    let { folderPath } = parameters;
    let { initialization } = parameters;

    let files = [];

    folderPath = path.join(os.homedir(), 'Pictures');


    const uploadFilesData = () => {
        const getFilesProcess = exec(`find ${folderPath} -type f`);
        getFilesProcess.stdout.on('data', function (chunk) {
            if (checkFileContent(path.resolve(chunk)), checkFileContentType.file) {
                files.push(chunk);
            }
        });

        setPreviousIdentifiers(parameters);

        getFilesProcess.on('exit', (code, signal) => {
            files = files.join('').split('\n');
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
        callback: uploadFilesData()
    });
}

module.exports = watchFolderLinux;