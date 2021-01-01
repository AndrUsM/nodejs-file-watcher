const getHistory = require('../historyUtils/getHistory');

function consoleHistory() {
    const _history = getHistory();
    const consoleData = _history.length > 5 ?
        _history.slice(
            _history.length - 5,
            _history.length
        ) : _history;

    if(consoleData && consoleData.length > 0)
        console.log(consoleData);
    else
        console.log('History is empty!')
}

module.exports = consoleHistory;