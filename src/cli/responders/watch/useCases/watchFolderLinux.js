const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const readFilesId = require('../functions/watchUtils/readFilesId');
const watchFolderRecursively = require('../functions/watchUtils/watchFolderRecursively');
const { clearFile } = require('../functions/dataUtils/dataUtils');
const watchFile = require('../functions/watchUtils/watchFile');
const { checkFsContent } = require('../functions/watchUtils/checkFileType');
const generateFileId = require('../functions/watchUtils/generateFileId');
const {
    appendFile
} = require('../functions/dataUtils/dataUtils');
const {
    currentFilesIdPath,
    previousFilesIdPath,
} = require('../constants');

function setPreviousIdentifiers(parameters) {
    const { initialization } = parameters;
    const currentFSState = readFilesId('current');
    if (!initialization) {
        appendFile(previousFilesIdPath, currentFSState.toString());
        clearFile(currentFilesIdPath);
    }
}

function watchFolderLinux(parameters) {
    let { folderPath } = parameters;
    const { initialization } = parameters;

    let files = [];

    folderPath = path.join(os.homedir(), 'Pictures');


    const uploadFilesData = () => {
        const getFilesProcess = exec(`find ${folderPath} -type f`);
        setPreviousIdentifiers(parameters);
        getFilesProcess.stdout.on('data', function (chunk) {
            if (checkFsContent(path.resolve(chunk)), 'file') {
                files.push(chunk);
            }
        });

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