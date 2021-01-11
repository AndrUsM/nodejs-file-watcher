const path = require('path');
const eventEmmiter = require('../events/events');
const formatTime = require('./formatTime');
const getFileType = require('../watchUtils/getFileType');
const formatSize = require('../watchUtils/formatSize');

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
        ].join('; '),
        type: getFileType(current),
        path: filePath,
        accessTime: formatTime(atime),
        modificationTime: formatTime(mtime),
        changeTime: formatTime(ctime),
        creationTime: formatTime(birthtime)
    }
}

module.exports = generateReport;