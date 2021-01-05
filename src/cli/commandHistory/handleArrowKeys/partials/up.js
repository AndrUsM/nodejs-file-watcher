const getLastCommand = require('../getLastCommand');

function upKeyAction() {
    console.clear();
    let lastCommand = getLastCommand();
    if (lastCommand)
        process.stdout.write(lastCommand);
}

module.exports = upKeyAction;