const fs = require('fs');
const path = require('path');
const saveToHistory = require('../functions/historyUtils/saveToHistory');
const eventEmmiter = require('../functions/events/events');

function defaultWatchFolder(folderPath) {
    return fs.watch(folderPath, { recursive: true }, (event, filename) => {
        const filePath = path.join(folderPath, filename);
        saveToHistory({
            event: eventEmmiter(filePath),
            filePath: filePath,
            savedFileData: {}
        });
    });
}

module.exports = defaultWatchFolder;