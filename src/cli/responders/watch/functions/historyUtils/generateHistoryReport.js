const fs = require('fs');
const path = require('path');
const { getFileType } = require('../watchUtils/checkFileType');
const generateFileId = require('../watchUtils/generateFileId');

function generateHistoryReport(filePath, event, options) {
    let {
        deleted,
        savedFileData
    } = options;

    deleted = typeof deleted === 'boolean' ? deleted : false;

    if (fs.existsSync(filePath)) {
        const filename = path.basename(filePath);
        const fileStats = fs.statSync(filePath);
        const {
            atime,
            ctime,
            mtime,
            birthtime,
            size,
        } = fileStats;
        return {
            event: event,
            filename: filename,
            size: size,
            type: getFileType(fileStats),
            path: filePath,
            fileId: generateFileId(filePath),
            accessTime: +atime,
            modificationTime: +mtime,
            changeTime: +ctime,
            creationTime: +birthtime
        }
    }
    else {
        if (deleted) {
            const {
                filename,
                path,
                size,
                type,
                fileId,
                accessTime,
                modificationTime,
                changeTime,
                creationTime,
            } = savedFileData;

            return {
                event: 'removed',
                filename: filename,
                size: size,
                type: type,
                path: path,
                fileId: fileId,
                accessTime: accessTime,
                modificationTime: modificationTime,
                changeTime: changeTime,
                creationTime: creationTime
            }
        } else {
            console.log(`Cannot generate report. Path ${filePath} is unaccessable.`);
        }
    }
}

module.exports = generateHistoryReport;