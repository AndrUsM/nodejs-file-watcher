
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

    const message = {
        title: title,
        data: matches[0].join(',')
    }
    const outMessage = () => {
        const messageString = [
            '',
            [
                generateColoredString({
                    data: message.title,
                    type: messageType.error
                }),
                generateColoredString({
                    data: message.data,
                    type: messageType.warning
                })
            ].join(':')
        ].join('\n');
        execute(messageString);
    }

    outMessage();
    // out(message.data, messageType.warning);
    return matches;
}

module.exports = completer;