const Readline = require('readline');
const commands = require('./commandList');
const emmiter = require('./emmiters');
const completer = require('./completer/completer');
const handleKeyboard = require('./handleKeyboard/handleKeyboard');
const { saveToCommandsHistory } = require('./commandHistory/commandsHistory');
const {
    out,
    messageType
} = require('../lib/coloredOut/out');
const {
    appendCurrentLine,
    removeLastItemOfCurrentLine
} = require('./handleKeyboard/currentLine.js');
const outCurrentCommandTitle = require('../lib/outCurrentCommandTitle/outCurrentCommandTitle');
const { clearFile } = require('./responders/watch/functions/dataUtils/dataUtils');
const {
    applicationHistoryPath,
    applicationModeConfigFilePath,
    watchFolderInfoPath,
    currentFilesIdPath,
    previousFilesIdPath
} = require('./responders/watch/constants');

const cli = {};

cli.promptMessage = () => {
    readline.prompt();
}

const readline = Readline.createInterface({
    input: process.stdin,
    out: process.stdout,
    terminal: true,
    completer: completer,
});

cli.saveCurrentLine = () => {
    const ignoreKeyList = [127]; // backspace key
    process.stdin.on('data', (data) => {
        const asciiKey = +data.codePointAt(0).toString(10);
        const isServiceButtons = ignoreKeyList.find(item => item === asciiKey);
        const checkSymbols = asciiKey > 31 && !isServiceButtons; // 32 is a space key
        if (checkSymbols)
            appendCurrentLine(data.toString());
        if (asciiKey === 127)
            removeLastItemOfCurrentLine();
    });
}

cli.clearConfigData = () => {
    clearFile(applicationHistoryPath);
    clearFile(applicationModeConfigFilePath);
    clearFile(watchFolderInfoPath);
    clearFile(currentFilesIdPath);
    clearFile(previousFilesIdPath);
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
            const functionParameters = {
                command: matcherCommand,
                line: line
            };
            emmiter.emit(matcherCommand, line);
            saveToCommandsHistory(functionParameters);
            outCurrentCommandTitle(functionParameters);
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