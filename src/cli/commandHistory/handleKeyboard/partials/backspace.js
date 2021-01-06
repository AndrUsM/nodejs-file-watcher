const readline = require('readline');
const { stdout } = require('process');
const { getCurrentLine } = require('../currentLine');

function backspaceKeyAction() {
    readline.clearLine(stdout);
    readline.cursorTo(stdout, 0);
    stdout.write(getCurrentLine())
}

module.exports = backspaceKeyAction;