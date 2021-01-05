const fs = require('fs');
const generateReport = require('../historyUtils/generateReport');
const consoleHistory = require('../historyUtils/consoleHistory');
const saveToHistory = require('../historyUtils/saveToHistory');

function watchFile(filePath) {
    return fs.watchFile(
        filePath,
        { persistent: true },
        (current, previous) => {
            const report = generateReport({
                current: current,
                previous: previous,
                filePath: filePath
            });
            saveToHistory({
                fileData: report
            });
            consoleHistory();
        }
    )
}

module.exports = watchFile;