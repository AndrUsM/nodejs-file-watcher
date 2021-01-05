const {
    out,
    messageType
} = require("../../lib/coloredOut/out");
const commandsHistory = require("../commandHistory/commandsHistory");

function historyResponder() {
    out(commandsHistory(), messageType.info)
}

module.exports = historyResponder;