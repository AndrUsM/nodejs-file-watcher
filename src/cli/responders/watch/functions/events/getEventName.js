import fs from 'fs';
import { allEqual } from '../dataUtils/arrayUtils.js'
import {
    EVENT_ACCESS,
    EVENT_CREATED,
    EVENT_EDITED
} from './eventsList.js';

export function getEventName(filePath) {
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