const {
    out,
    messageType
} = require("../coloredOut/out");

function outCurrentCommandTitle(parameters) {
    const {
        command,
        line
    } = parameters;

    const formatMessage = (title, line) => [
        title.toUpperCase(),
        line.toLowerCase()
    ].join(':');

    const message = [
        formatMessage('command', command),
        formatMessage(' line', line)
    ].join('\n');

    out(message, messageType.info);
}

module.exports = outCurrentCommandTitle;