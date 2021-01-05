const fs = require('fs');
const {
    EVENT_REMOVE,
    EVENT_UNHANDLED,
} = require('./eventsList');
const removeCondition = require('./removeCondition');
const getEventName = require('./getEventName');

function eventEmmiter(filePath) {
    const isExist = fs.existsSync(filePath);
    if (isExist) {
        return getEventName(filePath);
    } else {
        if (removeCondition(filePath))
            return EVENT_REMOVE;
        else
            return EVENT_UNHANDLED;
    }
}



module.exports = eventEmmiter;