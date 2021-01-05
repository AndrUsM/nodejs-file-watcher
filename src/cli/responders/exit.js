const {
    out,
    messageType
} = require("../../lib/coloredOut/out");

function exitResponder() {
    out('Buy!', messageType.info);
    process.exit(1);
}

module.exports = exitResponder;