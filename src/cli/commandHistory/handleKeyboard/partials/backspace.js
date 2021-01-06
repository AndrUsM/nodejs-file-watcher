const readline = require('readline');
const { stdout } = require('process');
const { getCurrentLine } = require('../currentLine');

function backspaceKeyAction() {
    readline.clearLine(stdout, -1);
    readline.cursorTo(stdout, 0);
}

module.exports = backspaceKeyAction;