const Readline = require('readline');
const commands = require('./commandList');
const emmiter = require('./emmiters');
const completer = require('./completer/completer');
const handleKeyboard = require('./commandHistory/handleKeyboard/handleKeyboard');
const { saveToCommandsHistory } = require('./commandHistory/commandsHistory');
const {
    out,
    messageType
} = require('../lib/coloredOut/out');
const { appendCurrentLine } = require('./commandHistory/handleKeyboard/currentLine');

const cli = {};

cli.promptMessage = () => {
    readline.prompt();
}

const readline = Readline.createInterface({
    input: process.stdin,
    out: process.stdout,
    terminal: true,
    completer: completer
});

cli.saveCurrentLine = () => {
    process.stdin.on('data', (data) => {
        const checkSymbols = +data.codePointAt(0).toString(10) > 32;
        if (checkSymbols)
            appendCurrentLine(data.toString());
    });
}

cli.initialize = () => {
    cli.promptMessage();
    cli.saveCurrentLine();
    handleKeyboard();
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

        cli.promptMessage();
    });
    readline.on('close', () => {
        process.exit(1);
    });
}

module.exports = cli;