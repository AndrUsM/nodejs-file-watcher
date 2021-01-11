import fs from 'fs';
import {
    EVENT_REMOVE,
    EVENT_UNHANDLED
} from './eventsList.js';
import { removeCondition } from './removeCondition.js';
import { getEventName } from './getEventName.js'

export function eventEmmiter(filePath) {
    const isExist = fs.existsSync(filePath);
    const _removeCondition = removeCondition(filePath);
    if (isExist) {
        return getEventName(filePath);
    } else {
        if (_removeCondition)
            return EVENT_REMOVE;
        else
            return EVENT_UNHANDLED;
    }
}
