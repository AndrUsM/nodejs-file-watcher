import readline from 'readline';
import { stdout } from 'process';
import { getCurrentLine } from '../currentLine.js';

export function toStartLine() {
    // ctrl + a
    stdout.write("\r");
}

export function toEndLine() {
    // ctrl + e
    const currentLineLength = getCurrentLine().length;
    readline.cursorTo(stdout, currentLineLength + 1);
}
