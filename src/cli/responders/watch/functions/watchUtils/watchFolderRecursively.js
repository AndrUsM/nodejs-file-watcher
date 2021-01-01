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

function _watchFolderRecursively(parameters) {
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

    fsListener(callback);

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

                saveToHistory(
                    {
                        filePath: _path,
                        event: fileChangeEvent,
                        savedFileData: {}
                    }
                );

                consoleHistory();

                switch (eventType) {
                    case 'rename': {
                        callback;
                        break;
                    }
                }
            });
        })
    })
}

function watchFolderRecursively(parameters) {
    const {
        folderPath
    } = parameters;

    fs.watch(folderPath, 'utf8', _ => {
        _watchFolderRecursively(parameters);
    });
}

module.exports = watchFolderRecursively;