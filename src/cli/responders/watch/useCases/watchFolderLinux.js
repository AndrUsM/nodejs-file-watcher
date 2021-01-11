import { watchFolderRecursively } from '../functions/watchUtils/watchFolderRecursively.js';
import { uploadFilesData } from '../functions/watchUtils/uploadFilesData.js';

export function watchFolderLinux(parameters) {
    let {
        folderPath,
        initialization
    } = parameters;

    watchFolderRecursively({
        initialization: initialization,
        folderPath: folderPath,
        callback: uploadFilesData({
            folderPath: folderPath
        })
    });
}