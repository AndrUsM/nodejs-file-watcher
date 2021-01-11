import fs from 'fs';
import path from 'path';
import { createFile } from '../dataUtils/dataUtils.js';
import {
    previousFilesIdPath,
    currentFilesIdPath
} from '../../constants.js';

export const readFilesIdType = {
    prev: "prev",
    current: "current"
}

export function readFilesId(type) {
    let _path = '';
    switch (type) {
        case readFilesIdType.prev: {
            _path = previousFilesIdPath;
            break;
        }
        case readFilesIdType.current: {
            _path = currentFilesIdPath;
            break;
        }
    }

    if (!path) {
        return [];
    }

    createFile(_path);
    let data = fs.readFileSync(_path)

    if (data) {
        data = data.toString().split('\n');
        return data;
    } else {
        return [];
    }
}