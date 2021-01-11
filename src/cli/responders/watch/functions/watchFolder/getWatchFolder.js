const fs = require('fs');
const os = require('os');
const { watchFolderInfoPath } = require('../../constants');
const { readFile } = require('../dataUtils/dataUtils');

function getWatchFolder() {
    if (fs.existsSync(watchFolderInfoPath)) {
        return readFile(watchFolderInfoPath);
    } else {
        return os.homedir();
    }
}

module.exports = getWatchFolder;