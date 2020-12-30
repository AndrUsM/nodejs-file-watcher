const fs = require('fs');
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
            console.log(report)
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