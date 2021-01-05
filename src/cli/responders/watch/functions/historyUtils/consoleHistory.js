const getHistory = require('./getHistory');
const handleApplicationMode = require('../mode/handleApplicationMode');
const {
    out,
    messageType
} = require('../../../../../lib/coloredOut/out');

function consoleHistory() {
    const _history = getHistory();

    const consoleData = _history.length > 5 ?
        _history.slice(
            _history.length - 5,
            _history.length
        ) : _history;

    const consoleModeCallback = () => {
        if (consoleData && consoleData.length > 0)
            out(consoleData, messageType.default);
        else
            out('History is empty!', messageType.warning)
    };
    const browserModeCallback = () => { };

    handleApplicationMode({
        browserModeCallback: browserModeCallback(),
        consoleModeCallback: consoleModeCallback(),
        defaultModeCallback: consoleModeCallback()
    })
}

module.exports = consoleHistory;