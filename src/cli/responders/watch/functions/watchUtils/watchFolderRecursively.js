const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { checkFsContent } = require('./checkFileType');
const fsListener = require('./fsListener');
const eventEmmiter = require('../Events/events');
const saveToHistory = require('../historyUtils/saveToHistory');
const consoleHistory = require('../dataUtils/consoleHistory');
const { currentFilesIdPath } = require('../../constants');

function updateFsData(parameters) {
    const { callback } = parameters;
    let {
        folderPath,
    } = parameters;

    let folders = [];

    folderPath = path.resolve(os.homedir(), 'Pictures');
    const getFoldersProcess = exec(`find ${folderPath} -type d`);

    getFoldersProcess.stdout.on('data', chunk => {
        if (checkFsContent(folderPath, 'dir')) {
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
                const _path = path.join(folder, filename);
                const fileChangeEvent = eventEmmiter(_path);
                _saveHistoryData({
                    filePath: _path,
                    fileChangeEvent: fileChangeEvent
                });
                callback;
            });
        })
    })
}

function _saveHistoryData(parameters) {
    const {
        filePath,
        fileChangeEvent
    } = parameters;

    saveToHistory({
        filePath: filePath,
        event: fileChangeEvent,
        savedFileData: {}
    });
    consoleHistory();
}

function watchFolderRecursively(parameters) {
    fs.watchFile(currentFilesIdPath, { encoding: 'utf8' }, (current, prev) => {
        const condition = current.size !== prev.size || current.atime !== current.atime;
        if (condition)
            updateFsData(parameters);
    });
}

module.exports = watchFolderRecursively;