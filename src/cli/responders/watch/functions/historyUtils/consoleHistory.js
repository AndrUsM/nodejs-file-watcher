const getHistory = require('./getHistory');
const getApplicationMode = require('../mode/getApplicationMode');
const { applicationConsoleMode, applicationDefaultMode } = require('../../constants');
const handleApplicationMode = require('../mode/handleApplicationMode');

function consoleHistory() {
    const _history = getHistory();
    const _appMode = getApplicationMode();

    const consoleData = _history.length > 5 ?
        _history.slice(
            _history.length - 5,
            _history.length
        ) : _history;

    const consoleModeCallback = () => {
        if (consoleData && consoleData.length > 0)
            console.log(consoleData);
        else
            console.log('History is empty!');
    };
    const browserModeCallback = () => { };

    handleApplicationMode({
        browserModeCallback: browserModeCallback(),
        consoleModeCallback: consoleModeCallback(),
        defaultModeCallback: consoleModeCallback()
    })
}

module.exports = consoleHistory;