import path from 'path';
import { exec } from "child_process";
import {
    checkFileContent,
    checkFileContentType
} from './checkFileType.js';
import { setPreviousIdentifiers } from './setPreviousIdentifiers.js';
import { appendFile } from '../dataUtils/dataUtils.js';
import { watchFile } from './watchFile.js';
import { generateFileId } from './generateFileId.js';
import { currentFilesIdPath } from '../../constants.js';

export function uploadFilesData(parameters) {
    const {
        folderPath
    } = parameters;

    let files = [];

    const getFilesProcess = exec(`find ${folderPath} -type f`);
    getFilesProcess.stdout.on('data', function (chunk) {
        if (checkFileContent(path.resolve(chunk)), checkFileContentType.file) {
            files.push(chunk);
        }
    });

    setPreviousIdentifiers();

    getFilesProcess.on('exit', () => {
        files = files.join('').split('\n');
        files.forEach(item => {
            if (item) {
                const fileId = generateFileId(item, { whitespaces: true });
                appendFile(currentFilesIdPath, fileId);
                watchFile(item);
            }
        });
    });
}
