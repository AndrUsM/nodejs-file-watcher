const readline = require('readline');
const { stdout, stdin } = require('process');
const { getCurrentLine } = require('../currentLine');

function backspaceKeyAction() {
    readline.cursorTo(stdout, 0);
    readline.clearLine(stdout);

    stdin.write(getCurrentLine());
}

module.exports = backspaceKeyAction;
