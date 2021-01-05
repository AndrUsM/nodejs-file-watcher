const fs = require('fs');
const { allEqual } = require('../dataUtils/arrayUtils');
const {
    EVENT_ACCESS,
    EVENT_CREATED,
    EVENT_EDITED
} = require('./eventsList');

function getEventName(filePath) {
    const {
        atime,
        ctime,
        mtime,
        birthtime
    } = fs.statSync(filePath);

    const accessCondition = +ctime > +mtime;
    const createCondition = allEqual([
        +ctime,
        +atime,
        +birthtime,
        +mtime
    ]);
    const editCondition = +mtime > +birthtime;

    if (createCondition) return EVENT_CREATED;
    if (accessCondition) return EVENT_ACCESS;
    if (editCondition) return EVENT_EDITED;
}

module.exports = getEventName;