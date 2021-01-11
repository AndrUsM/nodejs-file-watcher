import fs from 'fs';
import { getHistory } from '../../../cli/responders/watch/functions/historyUtils/getHistory.js';
import {
    applicationBrowserMode,
    applicationDefaultMode,
    applicationHistoryPath
} from '../../../cli/responders/watch/constants.js';
import { getApplicationMode } from '../../../cli/responders/watch/functions/mode/getApplicationMode.js';

const historyPage = async (data, callback) => {
    switch (getApplicationMode()) {
        case applicationBrowserMode:
        case applicationDefaultMode: {
            await browserModeCallback(data, callback);
            break;
        }
        default: {
            await consoleModeCallback(data, callback);
            break;
        }
    }
}

const consoleModeCallback = async (data, callback) => {
    callback(200, "Browser mode is disabled. Restart application with <both> or <browser> mode.", 'html');
}

const browserModeCallback = async (data, callback) => {
    const _history = getHistory();

    const isExist =
        fs.existsSync(applicationHistoryPath) &&
        _history &&
        _history.length;

    if (isExist) {
        callback(200, JSON.stringify(_history, null, 3), 'json');
    } else {
        callback(404, `Cannot open index template.`, 'html');
    }
}

export default historyPage;