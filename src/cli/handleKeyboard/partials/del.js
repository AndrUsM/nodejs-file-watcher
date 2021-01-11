import { stdout } from 'process';
import { clearCurrentLine } from '../currentLine.js';
import { out } from '../../../lib/coloredOut/out.js';
import { messageType } from '../../../lib/coloredOut/messageType.js';

// BUG: stdin line not cleared properly, its will hide
export function deleteKeyAction() {
    clearCurrentLine();
    stdout.clearLine();
    stdout.cursorTo(0);

    out(
        'Press <Enter> to continue...',
        messageType.info
    );
}
