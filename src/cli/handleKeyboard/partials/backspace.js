import readline from 'readline';
import { stdout, stdin } from 'process';
import { getCurrentLine } from '../currentLine.js';

export function backspaceKeyAction() {
    readline.cursorTo(stdout, 0);
    readline.clearLine(stdout);

    stdin.write(getCurrentLine());
}

