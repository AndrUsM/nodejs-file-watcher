const clearResponder = require('../responders/clear');
const exitResponder = require('../responders/exit');
const { commandHistory } = require('./commandsHistory');

function handleArrowKeys() {
    var stdin = process.stdin;
    // stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
        let charAsAscii = key.toString().charCodeAt(0);
        switch (key) {
            case '\u0002': {
                clearResponder();
                break;
            }
            // up
            case '\u001B\u005B\u0041': {
                const _lastCommand = _getLastCommand();
                if (_lastCommand) {
                    process.stdout.write(commandHistory.line);
                }
                break;
            }
            // right
            case '\u001B\u005B\u0043': {
                process.stdout.write('right');
                break;
            }
            // down
            case '\u001B\u005B\u0042': {
                process.stdout.write('down');
                break;
            }
            // left
            case '\u001B\u005B\u0044': {
                process.stdout.write('left');
                break;
            }
            default: {
                process.stdout.write(key.toString());
                break;
            }
        }
    })
}

function _getLastCommand() {
    if (commandHistory.size > 0) {
        const commandsArray = Array.from(commandHistory.values());
        const _index = commandsArray.length - 1;
        return commandsArray[_index];
    } else {
        console.log('Command history is empty!')
    }
}

module.exports = handleArrowKeys;