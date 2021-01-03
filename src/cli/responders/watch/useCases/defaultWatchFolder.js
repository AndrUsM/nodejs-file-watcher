const fs = require('fs');
const saveToHistory = require('../functions/historyUtils/saveToHistory');
const eventEmmiter = require('../functions/Events/events');

function defaultWatchFolder(folderPath) {
    return fs.watch(folderPath, { recursive: true }, (event, filename) => {
        saveToHistory({
            event: eventEmmiter(filePath),
            filePath: folderPath,
            savedFileData: {}
        });
    });
}

module.exports = defaultWatchFolder;