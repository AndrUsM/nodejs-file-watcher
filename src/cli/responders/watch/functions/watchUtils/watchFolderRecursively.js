const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { checkFileContent, checkFileContentType } = require('./checkFileType');
const { currentFilesIdPath } = require('../../constants');

function updateFsData(parameters) {
    const {
        // callback,
        folderPath
    } = parameters;

    let folders = [];

    const getFoldersProcess = exec(`find ${folderPath} -type d`);

    getFoldersProcess.stdout.on('data', chunk => {
        if (checkFileContent(folderPath, checkFileContentType.directory)) {
            folders.push(chunk)
        }
    });

    getFoldersProcess.on('exit', () => {
        // remove empty elements, home directory and present as array
        folders = folders
            .join('')
            .trim()
            .split('\n')
            .slice(1);

        // onChange folder content
        folders.forEach(folder => {
            fs.watch(folder).on('change', (eventType, filename) => {
                callback;
            });
        })
    })
}

function watchFolderRecursively(parameters) {
    const { callback } = parameters;
    fs.watchFile(currentFilesIdPath, { encoding: 'utf8', persistent: true }, (current, prev) => {
        const condition = current.size !== prev.size || current.atime !== current.atime;
        if (condition) {
            updateFsData(parameters);
            callback;
        }
    });
}

module.exports = watchFolderRecursively;