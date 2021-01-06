const generateColoredString = require('./generateColoredString');
const isNullOrUndefined = require('../../lib/checkTypes/isNullOrUndefined');
const messageType = require('./messageType');

function out(data, type) {
    returnData = typeof returnData === 'boolean' ? returnData : false;

    let coloredMessage = generateColoredString({
        data: data,
        type: type,
        messageType: messageType
    })

    const isDataExist = !isNullOrUndefined(data);
    if (isDataExist) {
        if (type === messageType.default) {
            execute(data);
        }
        else {
            execute(coloredMessage);
        }
    } else {
        execute(coloredMessage);
    }
}

function execute(message) {
    console.log(message);
}

module.exports = {
    out,
    execute,
    messageType:messageType
}