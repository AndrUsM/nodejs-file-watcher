const readline = require('readline');
const { stdout } = require('process');
const { clearCurrentLine } = require('../currentLine');

function backspaceKeyAction() {
    readline.clearLine(stdout);
    readline.cursorTo(stdout, 0);
    clearCurrentLine();
}

module.exports = backspaceKeyAction;
