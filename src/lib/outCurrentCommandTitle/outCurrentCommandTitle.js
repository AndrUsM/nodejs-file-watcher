import { out } from '../coloredOut/out.js';
import { messageType } from '../coloredOut/messageType.js';

export function outCurrentCommandTitle(parameters) {
    const {
        command,
        line
    } = parameters;

    const formatMessage = (title, line) => [
        title.toUpperCase(),
        line.toLowerCase()
    ].join(':');

    const message = [
        formatMessage('command', command),
        formatMessage(' line', line)
    ].join('\n');

    out(message, messageType.info);
}