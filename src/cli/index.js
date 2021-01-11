import Readline from 'readline';
import {commands} from './commandList.js';
import emmiter from './emmiters.js';
import {completer} from './completer/completer.js';
import {handleKeyboard} from './handleKeyboard/handleKeyboard.js';
import { saveToCommandsHistory } from './commandHistory/commandsHistory.js';
import { out } from '../lib/coloredOut/out.js';
import { messageType } from '../lib/coloredOut/messageType.js';
import {
    appendCurrentLine,
    removeLastItemOfCurrentLine
} from './handleKeyboard/currentLine.js';
import {outCurrentCommandTitle} from '../lib/outCurrentCommandTitle/outCurrentCommandTitle.js';
import { clearFile } from './responders/watch/functions/dataUtils/dataUtils.js';
import {
    applicationHistoryPath,
    applicationModeConfigFilePath,
    watchFolderInfoPath,
    currentFilesIdPath,
    previousFilesIdPath
} from './responders/watch/constants.js';

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
        if (checkSymbols) {
            appendCurrentLine(data.toString());
        }

        if (asciiKey === 127) {
            removeLastItemOfCurrentLine();
        }
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

export default cli;