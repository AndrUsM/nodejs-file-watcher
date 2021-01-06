const {
    out,
    messageType
} = require("../../lib/coloredOut/out");
const { commandHistory } = require("../commandHistory/commandsHistory");

function historyResponder() {
    out(commandHistory, messageType.default)
}

module.exports = historyResponder;