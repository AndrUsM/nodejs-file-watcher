const {
    out,
    messageType
} = require('../../../lib/coloredOut/out');
const { keyIterator, changeKeyIteratorOperation, changeKeyIterator } = require('./keyIterator');
const { commandHistory } = require('../commandsHistory');

function getLastCommand() {
    if (commandHistory.size > 0) {
        const commandsArray = Array.from(commandHistory.values());
        const _index = commandsArray.length - keyIterator;
        console.clear();
        changeKeyIterator(changeKeyIteratorOperation.increase)
        return commandsArray[_index];
    } else {
        out('Command history is empty!', messageType.warning);
    }
}

module.exports = getLastCommand;