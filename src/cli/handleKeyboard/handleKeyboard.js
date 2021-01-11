import { clearResponder } from '../responders/clear.js';
import { exitResponder } from '../responders/exit.js';
import { historyResponder } from '../responders/history.js';
import {
    leftArrowKeyAction,
    rightArrowKeyAction,
    upArrowKeyAction
} from './partials/arrows.js';
import {
    toStartLine,
    toEndLine
} from './partials/shortcuts.js';
import { backspaceKeyAction } from './partials/backspace.js';
import { backspaceKeyAction } from './partials/backspace.js';
import { deleteKeyAction } from './partials/del.js';
import { clearCurrentLine } from './currentLine.js';

export function handleKeyboard() {
    let {
        stdin,
        stdout
    } = process;

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
        // console.log(toUnicode(key));
        switch (key.charCodeAt(0)) {
            case 127: {
                // backspace
                backspaceKeyAction();
                break;
            }
        }
        switch (key) {
            case '\u000D': {
                // enter
                clearCurrentLine();
                break;
            }
            case "\u001B\u005B\u0048":
            // home
            case '\u0001': {
                // ctrl + a
                toStartLine()
                break;
            }
            case '\u001B\u005B\u0033\u007E': {
                // delete
                deleteKeyAction();
                break;
            }
            case '\u0005': {
                // ctrl + e
                toEndLine();
                break;
            }
            case '\u0017': {
                // ctrl + w
                delKeyAction();
                break;
            }
            case '\u001B\u005B\u0041': {
                // up
                upArrowKeyAction();
                break;
            }
            case '\u001B\u005B\u0042': {
                // down
                historyResponder();
                break;
            }
            case '\u001B\u005B\u0043': {
                // right
                rightArrowKeyAction();
                break;
            }
            case '\u0002':
            // ctrl + b
            case '\u001B\u005B\u0044': {
                // left
                leftArrowKeyAction()
                break;
            }
            case '\u0003': {
                // ctrl + C
                exitResponder();
                break;
            }
            case '\u000C': {
                // clrl + L
                clearResponder();
                break;
            }
            default: {
                return stdout.write(key.toString());
            }
        }
    });
}

export function toUnicode(theString) {
    let unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        let theUnicode = theString
            .charCodeAt(i)
            .toString(16)
            .toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}