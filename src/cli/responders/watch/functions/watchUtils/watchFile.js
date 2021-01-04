const fs = require('fs');
const path = require('path');
const eventEmmiter = require('../Events/events');
const formatTime = require('../historyUtils/formatTime');
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
            saveToHistory({
                fileData: report
            });
        }
    )
}

function generateReport(items) {
    const {
        current,
        previous,
        filePath
    } = items;
    const {
        atime,
        ctime,
        mtime,
        birthtime,
    } = current;

    const filename = path.basename(filePath);
    return {
        event: eventEmmiter(filePath),
        filename: filename,
        size: [
            `current: ${formatSize(current.size)}`,
            `previous: ${formatSize(previous.size)}`,
            `changes: ${formatSize(current.size - previous.size)}`
        ].join('\n'),
        type: getFileType(current),
        path: filePath,
        accessTime: formatTime(atime),
        modificationTime: formatTime(mtime),
        changeTime: formatTime(ctime),
        creationTime: formatTime(birthtime)
    }
}

module.exports = watchFile;