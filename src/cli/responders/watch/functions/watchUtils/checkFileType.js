const fs = require('fs');

function getFileType(file) {
    return file.isDirectory() ? 'directory' : 'file';
}

function checkFsContent(folderPath, type) {
    switch (type) {
        case 'dir': {
            return fs.lstatSync(folderPath).isDirectory();
        }
        case 'file': {
            return fs.lstatSync(folderPath).isFile();
        }
        default: {
            return false;
        }
    }
}

module.exports = {
    getFileType: getFileType,
    checkFsContent: checkFsContent
}