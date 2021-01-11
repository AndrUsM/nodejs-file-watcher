import fs from 'fs';
import {
    appendFile,
    createFile
} from '../dataUtils/dataUtils.js'
import { applicationHistoryPath } from '../../constants.js';
import { SPECIAL_SIGN as specialSign } from './constants.js';

const dataObjectExpectedLength = 9;

export function saveToHistory(parameters) {
    let {
        fileData
    } = parameters;

    if (!fs.existsSync(applicationHistoryPath))
        createFile(applicationHistoryPath);

    const checkInsideFileData = Object.values(fileData).length === dataObjectExpectedLength
    if (checkInsideFileData) {
        appendFile(applicationHistoryPath, addSpecialSign(fileData));
    }
}

const addSpecialSign = (data) => {
    data = typeof data !== 'string' ? JSON.stringify(data) : data;
    return [
        data,
        specialSign
    ].join('');
}
