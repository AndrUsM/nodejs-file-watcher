import fs from 'fs';
import { basename } from 'path';
import { out } from '../../../../../lib/coloredOut/out.js';
import { messageType } from '../../../../../lib/coloredOut/messageType.js';

export function createFile(filePath) {
    if (!fs.existsSync(filePath)) {
        writeFileSync(
            filePath,
            '',
            { encoding: 'utf8' }
        );
    }
}

export function writeFile(filePath, data) {
    createFile(filePath);
    fs.writeFile(filePath, data, (error) => {
        if (error)
            out(
                `Error writing ${data} to ${filePath}.`,
                messageType.error
            );
        return true;
    })
}

export function clearFile(filePath) {
    createFile(filePath);
    fs.truncate(
        filePath,
        0,
        error => {
            if (error) {
                out(
                    error.message,
                    messageType.error
                );
            } else {
                let filename = basename(filePath)
                out(
                    `File ${filename} was cleared!`,
                    messageType.info
                )
            }
        }
    );
}

export function appendFile(filePath, data) {
    createFile(filePath);
    fs.appendFile(filePath, data, { encoding: 'utf8' }, (err) => {
        if (err)
            out(
                err.message,
                messageType.error
            );
    })
}

export function readFile(filePath) {
    if (existsSync(filePath)) {
        const data = readFileSync(filePath, { encoding: 'utf8' });
        if (data && data.length) {
            return data.toString();
        } else {
            return '';
        }
    } else {
        return '';
    }
}

// export const appendFile = appendFile;
// export const clearFile = clearFile;
// export const createFile = createFile;
// export const readFile = readFile;
// export const writeFile = writeFile;