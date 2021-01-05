const Readline = require('readline');
const commands = require('./commandList');
const emmiter = require('./emmiters');
const handleArrowKeys = require('./commandHistory/handleArrowKeys/handleArrowKeys');
const { saveToCommandsHistory } = require('./commandHistory/commandsHistory');
const {
    out,
    messageType
} = require('../lib/coloredOut/out');

const readline = Readline.createInterface({
    input: process.stdin,
    out: process.stdout
})

const cli = {};

cli.promptMessage = () => {
    readline.prompt();
    process.stdout.write("> ");
}

cli.initialize = () => {
    handleArrowKeys();
    cli.promptMessage()
    readline.on('line', line => {
        console.clear();
        line = line.trim();
        const enteredCommand = line ? line.split(' ')[0] : '';
        let matcherCommand = Object.keys(commands).find(command => enteredCommand.startsWith(command));

        if (matcherCommand) {
            emmiter.emit(matcherCommand, line);
            saveToCommandsHistory({
                command: matcherCommand,
                line: line
            });
        }
        else
            out(
                `Command ${line} not found`,
                messageType.warning
            );

        cli.promptMessage()
    });
    readline.on('close', () => {
        process.exit(1);
    });
}

module.exports = cli;