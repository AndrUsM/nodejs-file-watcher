const fs = require('fs');
const generateFileId = require('../watchUtils/generateFileId');
const readFilesId = require('../watchUtils/readFilesId');
const getHistory = require('../historyUtils/getHistory');
const saveToHistory = require('../historyUtils/saveToHistory');
const generateHistoryReport = require('../historyUtils/generateHistoryReport');

const EVENT_CREATED = 'created';
const EVENT_REMOVE = 'removed';
const EVENT_EDITED = 'edited';
const EVENT_ACCESS = 'accessed';
const EVENT_UNHANDLED = 'lost';

function eventEmmiter(filePath) {
    const isExist = fs.existsSync(filePath);
    if (isExist) {
        return _getEventName(filePath);
    } else {
        if (removeCondition(filePath))
            return EVENT_REMOVE;
        else
            return EVENT_UNHANDLED;
    }
}

function _getEventName(filePath) {
    const {
        atime,
        ctime,
        mtime,
        birthtime
    } = fs.statSync(filePath);

    const allEqual = items => items.every(v => v === items[0])

    const accessCondition = +ctime > +mtime;
    const createCondition = allEqual([+ctime, +atime, +birthtime, +mtime]);
    const editCondition = +mtime > +birthtime;

    if (createCondition) return EVENT_CREATED;
    if (accessCondition) return EVENT_ACCESS;
    if (editCondition) return EVENT_EDITED;
}

function removeCondition(filePath) {
    const _history = getHistory();

    if (_history && _history.length) {
        let fileHistory = _history.filter(item => {
            if (item) {
                return item.path === filePath
            }
        });
        fileHistory = fileHistory.sort((a, b) => b - a);

        const fileLastChange = fileHistory[0];
        if (fileLastChange) {
            saveToHistory(
                {
                    filePath: filePath,
                    event: EVENT_REMOVE,
                    savedFileData: fileLastChange
                }
            )
            return fileHistory && fileHistory.length > 0;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = eventEmmiter;