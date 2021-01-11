import fs from 'fs';

export const checkFileContentType = {
    "directory": "dir",
    "file": "file"
}

export function checkFileContent(folderPath, type) {
    switch (type) {
        case checkFileContentType.directory: {
            return fs.lstatSync(folderPath).isDirectory();
        }
        case checkFileContentType.file: {
            return fs.lstatSync(folderPath).isFile();
        }
        default: {
            return false;
        }
    }
}