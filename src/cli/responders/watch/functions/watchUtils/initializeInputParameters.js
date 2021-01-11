import path from 'path';
import fs from 'fs';
import os from 'os';
import { destructureLine } from './destructureLine.js';
import {
    applicationModeList,
    applicationDefaultMode
} from '../../constants.js';

export function initializeApplicationMode(splitedLine) {
    let applicationMode = splitedLine ? splitedLine[2] : applicationDefaultMode;
    applicationMode = destructureLine({
        line: applicationMode,
        type: 'string',
        field: 'mode',
        required: false,
        defaultValue: applicationDefaultMode,
        checkFunction: function (value) {
            return (
                typeof applicationModeList.find(item => item === value) === 'string'
            );
        }
    });
    return applicationMode;
}

export function initializeWatchPath(splitedLine) {
    let folderPath = splitedLine ? splitedLine[1] : '';
    folderPath = destructureLine({
        line: folderPath,
        required: true,
        type: 'string',
        field: 'path',
        defaultValue: os.homedir(),
        generateValue: function (enteredPath) {
            return path.join(os.homedir(), enteredPath);
        },
        checkFunction: function (value) {
            return fs.existsSync(value);
        }
    });
    return folderPath;
}