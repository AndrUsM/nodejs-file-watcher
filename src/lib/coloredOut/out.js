const consoleColors = require('./colors');

const messageType = {
    "error": "error",
    "info": "info",
    "warning": "warning",
    "default": "default",
    "hidden": "hidden",
    "underscore": "underscore"
}

function isNullOrUndefined(data) {
    return (
        typeof data === 'undefined' ||
        !data
    )
}

function out(data, type) {
    let color = consoleColors.default;
    const checkTypeValue = Object.values(messageType).includes(type);

    if (checkTypeValue) {
        switch (type) {
            case messageType.hidden: {
                color = consoleColors.hidden;
                break;
            }
            case messageType.info: {
                color = consoleColors.fgGreen;
                break;
            }
            case messageType.underscore: {
                color = consoleColors.underscore;
                break;
            }
            case messageType.error: {
                color = consoleColors.fgRed;
                break;
            }
            case messageType.warning: {
                color = consoleColors.fgYellow;
                break;
            }
            case messageType.default:
            default: {
                color = consoleColors.default;
                break;
            }
        }
    }

    const coloredMessage = [
        color,
        data,
        consoleColors.default
    ].join(' ');

    const isDataExist = !isNullOrUndefined(data);
    if (isDataExist) {
        if (type === messageType.default)
            console.log(data);
        else
            console.log(coloredMessage);
    } else
        console.log(coloredMessage);
}

module.exports = {
    out: out,
    messageType: messageType
}