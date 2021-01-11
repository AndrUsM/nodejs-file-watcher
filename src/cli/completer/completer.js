
const generateColoredString = require('../../lib/coloredOut/generateColoredString');
const {
    out,
    execute,
    messageType
} = require('../../lib/coloredOut/out');
const commands = require('../commandList');

function completer(line) {
    console.clear();
    out(`Entered command: ${line}`, messageType.warning);

    const commandList = Object.values(commands);
    const hits = commandList.filter(c => c.startsWith(line));

    // show all completions if none found
    const isFound = hits.length;
    const matches = [isFound ? hits : commandList, line];
    const title = isFound ? 'Matched commands' : 'Commands list';
    const formattedData = matches[0].join(',');

    const message = generateMessage({
        title: title,
        data: formattedData
    });

    const outMessage = execute(message);
    outMessage;
    return matches;
}

function generateMessage(parameters) {
    const {
        title,
        data
    } = parameters;

    const message = {
        title: title,
        data: data
    }

    const coloredMessageArray = [
        generateColoredString({
            data: message.title,
            type: messageType.error
        }),
        generateColoredString({
            data: message.data,
            type: messageType.warning
        })
    ];

    const coloreMessage = coloredMessageArray.join(':');

    const messageString = [
        '',
        coloreMessage
    ].join('\n');

    return messageString;
}

module.exports = completer;