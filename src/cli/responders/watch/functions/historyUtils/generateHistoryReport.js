const fs = require('fs');
const path = require('path');
const { EVENT_REMOVE } = require('../Events/eventsList');
const { getFileType } = require('../watchUtils/checkFileType');
const formatTime = require('./formatTime');

function generateHistoryReport(filePath, event, options) {
    let {
        deleted,
        savedFileData
    } = options;

    deleted = typeof deleted === 'boolean' ? deleted : false;

    if (fs.existsSync(filePath)) {
        return _fileReport({
            event: event,
            filePath: filePath
        });
    } else {
        return _deletedFileReport({
            savedFileData: savedFileData,
            deleted: deleted
        });
    }
}

function _fileReport(parameters) {
    const {
        event,
        filePath
    } = parameters;

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
        accessTime: formatTime(atime),
        modificationTime: formatTime(mtime),
        changeTime: formatTime(ctime),
        creationTime: formatTime(birthtime)
    }
}

function _deletedFileReport(parameters) {
    const {
        savedFileData,
        deleted
    } = parameters;

    if (deleted) {
        const {
            filename,
            path,
            size,
            type,
            accessTime,
            modificationTime,
            changeTime,
            creationTime,
        } = savedFileData;

        return {
            event: EVENT_REMOVE,
            filename: filename,
            size: size,
            type: type,
            path: path,
            accessTime: accessTime,
            modificationTime: modificationTime,
            changeTime: changeTime,
            creationTime: creationTime
        }
    } else {
        console.log(`Cannot generate report. Path ${filePath} is unaccessable.`);
    }
}

module.exports = generateHistoryReport;