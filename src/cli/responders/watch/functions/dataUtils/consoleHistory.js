const getHistory = require('../historyUtils/getHistory');

function consoleHistory() {
    const _history = getHistory();
    const consoleData = _history.length > 5 ?
        _history.slice(
            _history.length - 5,
            _history.length
        ) : _history;

    console.log(consoleData);
}

module.exports = consoleHistory;