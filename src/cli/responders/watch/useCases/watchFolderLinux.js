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
    applicationHistoryPath
} = require('../constants');

function watchFolderLinux(parameters) {
    let { folderPath } = parameters;
    const { initialization } = parameters;

    let files = [];

    folderPath = path.join(os.homedir(), 'Pictures');
    const getFilesProcess = exec(`find ${folderPath} -type f`);

    const uploadFilesData = () => {
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

module.exports = watchFolderLinux;