const fs = require('fs');
const helpers = require('../../utlis/templates');
const tableUtils = require('../../utlis/generateTable');
const getHistory = require('../../../cli/responders/watch/functions/historyUtils/getHistory');
const { applicationHistoryPath, applicationBrowserMode, applicationDefaultMode } = require('../../../cli/responders/watch/constants');
const getApplicationMode = require('../../../cli/responders/watch/functions/mode/getApplicationMode');

const indexPage = async (data, callback) => {
    switch(getApplicationMode()){
        case applicationBrowserMode:
        case applicationDefaultMode:{
            await browserModelCallback(data, callback);
            break;
        }
        default:{
            await consoleModelCallback(data, callback);
            break;
        }
    }
}

const consoleModelCallback = async (data, callback) => {
    callback(200, "Enable browser mode!", 'html');
}

const browserModelCallback = async (data, callback) => {
    const _history = getHistory();
    const interpolateData = {
        history: tableUtils.generateTable(_history)
    };

    let template = await helpers.getTemplate('index');
    template = helpers.interpolate(template, interpolateData);

    const isExist = fs.existsSync(applicationHistoryPath);

    if (isExist) {
        callback(200, template, 'html');
    } else {
        callback(404, `Cannot open index template.`, 'html');
    }
}

module.exports = indexPage;