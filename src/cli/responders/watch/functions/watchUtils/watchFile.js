const fs = require('fs');
const eventEmmiter = require('../Events/events');
const saveToHistory = require('../historyUtils/saveToHistory');
const { getFileType } = require('./checkFileType');
const formatSize = require('./formatSize');

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
            // saveToHistory({
            //     filePath: filePath,
            //     event: eventEmmiter(filePath),
            //     savedFileData: {}
            // })
            return report;
        }
    )
}

function generateReport(items) {
    const {
        current,
        previous,
        filePath
    } = items;

    return {
        name: filePath,
        type: getFileType(current),
        size: {
            current: formatSize(current.size),
            previous: formatSize(previous.size),
            changes: formatSize(current.size - previous.size)
        }
    }
}

module.exports = watchFile;