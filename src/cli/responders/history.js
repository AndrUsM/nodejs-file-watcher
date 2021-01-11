import { out } from '../../lib/coloredOut/out.js';
import { messageType } from '../../lib/coloredOut/messageType.js';
import { commandHistory } from '../commandHistory/commandsHistory.js';

export function historyResponder() {
    out(commandHistory, messageType.default)
}
