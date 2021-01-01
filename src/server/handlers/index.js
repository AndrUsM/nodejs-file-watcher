const fs = require('fs');
const helpers = require('../utlis/templates');
const getHistory = require('../../cli/responders/watch/functions/historyUtils/getHistory');
const { applicationHistoryPath } = require('../../cli/responders/watch/constants');

const handler = {};

handler.index = async (data, callback) => {

    const _history = getHistory();
    const interpolateData = {
        history: helpers.generateTable(_history)
    };

    let template = await helpers.getTemplate('index');

    template = helpers.interpolate(template, interpolateData);
    const isExist = fs.existsSync(applicationHistoryPath);

    if (isExist) {
        callback(200, template, 'html');
    } else {
        callback(404, '', 'json');
    }
}

handler.notFound = async (data, callback) => {
    callback(404, null, 'json');
}

handler.public = async (data, callback) => {
    if (data.method !== 'get') {
        callback(405, null, 'html')
        return
    }
    try {
        let asset_name = data.trimmedPath.replace('public/images/', ''.trim())
        let content_type, extension
        switch (true) {
            case asset_name.includes('.css'): {
                content_type = 'css'
                extension = 'style'
                break;
            }
            case asset_name.includes('.js'):
                content_type = 'js'
                extension = 'js'
                break;
            default:
                content_type = 'plain'
                extension = 'text'
                break;
        }
        let asset = await helpers.getStaticAsset(asset_name, extension)
        callback(200, asset, content_type)
    } catch (err) {
        callback(404, null, 'html')
    }
}

module.exports = handler;