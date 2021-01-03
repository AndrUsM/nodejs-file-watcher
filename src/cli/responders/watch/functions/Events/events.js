const fs = require('fs');
const getHistory = require('../historyUtils/getHistory');
const saveToHistory = require('../historyUtils/saveToHistory');
const consoleHistory = require('../dataUtils/consoleHistory');
const {
    EVENT_ACCESS,
    EVENT_CREATED,
    EVENT_REMOVE,
    EVENT_UNHANDLED,
    EVENT_EDITED
} = require('./eventsList');

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

function _saveRemovedDataToHistory(parameters) {
    const {
        filePath,
        fileLastChange
    } = parameters;

    // saveToHistory(
    //     {
    //         filePath: filePath,
    //         event: EVENT_REMOVE,
    //         savedFileData: fileLastChange
    //     }
    // );
    consoleHistory();
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
            _saveRemovedDataToHistory({
                filePath: filePath,
                fileLastChange: fileLastChange
            });
            return fileHistory && fileHistory.length > 0;;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = eventEmmiter;