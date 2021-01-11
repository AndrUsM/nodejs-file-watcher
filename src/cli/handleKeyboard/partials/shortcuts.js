const readline = require('readline');
const { stdout } = require('process');
const { getCurrentLine } = require('../currentLine');

function toStartLine() {
    // ctrl + a
    stdout.write("\r");
}

function toEndLine() {
    // ctrl + e
    const currentLineLength = getCurrentLine().length;
    readline.cursorTo(stdout, currentLineLength + 1);
}

module.exports = {
    toStartLine,
    toEndLine
}