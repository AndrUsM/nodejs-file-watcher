import fs from 'fs';
import os from 'os';
import { readFile } from '../dataUtils/dataUtils.js';
import { watchFolderInfoPath } from '../../constants.js';

export function getWatchFolder() {
    if (fs.existsSync(watchFolderInfoPath)) {
        return readFile(watchFolderInfoPath);
    } else {
        return os.homedir();
    }
}