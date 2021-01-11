import fs from 'fs';
import { exec } from 'child_process';
import {
    checkFileContent,
    checkFileContentType
} from './checkFileType.js';
import { applicationHistoryPath } from '../../constants.js';

function updateFsData(parameters) {
    const {
        callback,
        folderPath
    } = parameters;

    let folders = [];

    const getFoldersProcess = exec(`find ${folderPath} -type d`);

    getFoldersProcess.stdout.on('data', chunk => {
        if (checkFileContent(folderPath, checkFileContentType.directory)) {
            folders.push(chunk);
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
        });
    });
}

export function watchFolderRecursively(parameters) {
    fs.watchFile(applicationHistoryPath, { encoding: 'utf8', persistent: true }, (current, prev) => {
        const condition = current.size !== prev.size || current.atime !== current.atime;
        if (condition) {
            updateFsData(parameters);
        }
    });
}
