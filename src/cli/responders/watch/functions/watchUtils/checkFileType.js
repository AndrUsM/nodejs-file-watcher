const fs = require('fs');

const checkFileContentType = {
    "directory": "dir",
    "file": "file"
}

function checkFileContent(folderPath, type) {
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

module.exports = {
    checkFileContentType: checkFileContentType,
    checkFileContent: checkFileContent
}