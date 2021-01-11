import { messageType } from "../../lib/coloredOut/messageType.js";
import { out } from "../../lib/coloredOut/out.js";
import { commandHistory } from "../commandHistory/commandsHistory.js";

export function getLastCommand() {
    if (commandHistory.size > 0) {
        const commandsArray = Array.from(commandHistory.values());
        const _index = commandsArray.length - 1;
        console.clear();
        return commandsArray[_index];
    } else {
        out('Command history is empty!', messageType.warning);
    }
}