import { commands } from '../commandList.js';

export let commandHistory = new Map();

export function saveToCommandsHistory(parameters) {
    const {
        command,
        line,
    } = parameters;
    if (commands.history !== command) {
        commandHistory.set(
            +new Date(),
            line
        );
    }
}