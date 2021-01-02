const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { checkFsContent } = require('./checkFileType');
const fsListener = require('./fsListener');
const eventEmmiter = require('../Events/events');
const saveToHistory = require('../historyUtils/saveToHistory');
const consoleHistory = require('../dataUtils/consoleHistory');

const initFunction = (parameters) => {
    let {
        callback,
        initialization
    } = parameters;

    if (initialization) {
        callback;
        initialization = false;
    }
}

function updateFsData(parameters) {
    const { callback } = parameters;

    let {
        folderPath,
        initialization
    } = parameters;

    initFunction({
        callback: callback,
        initialization: initialization
    });

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
    const {
        callback
    } = parameters;

    setInterval(() => {
        if (fsListener(callback))
            updateFsData(parameters);
    }, 2000);
}

module.exports = watchFolderRecursively;