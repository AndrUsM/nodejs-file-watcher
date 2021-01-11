import { writeFile } from '../dataUtils/dataUtils.js';
import { watchFolderInfoPath } from '../../constants.js';

export function setWatchFolder(_path) {
    writeFile(watchFolderInfoPath, _path);
}