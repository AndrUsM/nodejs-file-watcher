const readline = require('readline');
const { stdout } = require('process');

function deleteKeyAction() {
    readline.clearLine(stdout, 1);
}

module.exports = deleteKeyAction;