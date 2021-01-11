const readline = require('readline');
const {
    stdout,
    stdin
} = require('process');
const {
    getCurrentLine,
    clearCurrentLine
} = require('../currentLine');
const { timeStamp } = require('console');
const {
    out,
    messageType
} = require('../../../lib/coloredOut/out');

// BUG: stdin line not cleared properly, its will hide
function deleteKeyAction() {
    clearCurrentLine();
    stdout.clearLine();
    stdout.cursorTo(0);

    out(
        'Press <Enter> to continue...',
        messageType.info
    );
}

module.exports = deleteKeyAction;