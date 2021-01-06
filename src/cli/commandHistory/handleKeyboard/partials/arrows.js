const getLastCommand = require('../getLastCommand');
var readline = require('readline');

const { stdout } = process;

function upArrowKeyAction() {
    console.clear();
    let lastCommand = getLastCommand();
    if (lastCommand)
        process.stdout.write(lastCommand);
}

function leftArrowKeyAction() {
    readline.moveCursor(stdout, -1, 0);
}
function rightArrowKeyAction() {
    readline.moveCursor(stdout, 1, 0);
}

module.exports = {
    upArrowKeyAction,
    leftArrowKeyAction,
    rightArrowKeyAction
};