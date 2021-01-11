import { getLastCommand } from '../getLastCommand.js';
import readline from 'readline';
import { stdout } from 'process';

export function upArrowKeyAction() {
    console.clear();
    let lastCommand = getLastCommand();
    if (lastCommand)
        process.stdout.write(lastCommand);
}

export function leftArrowKeyAction() {
    readline.moveCursor(stdout, -1, 0);
}

export function rightArrowKeyAction() {
    readline.moveCursor(stdout, 1, 0);
}
