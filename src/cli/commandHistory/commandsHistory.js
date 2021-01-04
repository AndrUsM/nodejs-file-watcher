const commands = require("../commandList");

let commandHistory = new Map();

function saveToCommandsHistory(parameters) {
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

module.exports = {
    saveToCommandsHistory: saveToCommandsHistory,
    commandHistory: commandHistory
};