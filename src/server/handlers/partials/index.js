import fs from 'fs';
import templates from '../../utlis/templates.js';
import tableUtils from '../../utlis/generateTable.js';
import { getHistory } from '../../../cli/responders/watch/functions/historyUtils/getHistory.js';
import {
    applicationHistoryPath,
    applicationBrowserMode,
    applicationDefaultMode
} from '../../../cli/responders/watch/constants.js';
import { getApplicationMode } from '../../../cli/responders/watch/functions/mode/getApplicationMode.js';

const indexPage = async (data, callback) => {
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
    const interpolateData = {
        history: tableUtils.generateTable(_history)
    };

    let template = await templates.getTemplate('index');
    template = templates.interpolate(template, interpolateData);

    const isExist = fs.existsSync(applicationHistoryPath);

    if (isExist) {
        callback(200, template, 'html');
    } else {
        callback(404, `Cannot open index template.`, 'html');
    }
}

export default indexPage;