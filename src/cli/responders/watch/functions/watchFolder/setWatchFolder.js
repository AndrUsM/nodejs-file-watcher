const { watchFolderInfoPath } = require('../../constants');
const { writeFile } = require('../dataUtils/dataUtils');

function setWatchFolder(_path) {
    writeFile(watchFolderInfoPath, _path);
}

module.exports = setWatchFolder;