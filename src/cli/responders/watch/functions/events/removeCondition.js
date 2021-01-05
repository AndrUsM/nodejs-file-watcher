const getHistory = require('../historyUtils/getHistory');

function removeCondition(filePath) {
    const _history = getHistory();

    if (_history && _history.length) {
        let fileHistory = _history.filter(item => {
            if (item) {
                return item.path === filePath
            }
        });

        fileHistory = fileHistory.sort((a, b) => b - a);
        const fileLastChange = fileHistory[0];

        if (fileLastChange) {
            return fileHistory && fileHistory.length > 0;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = removeCondition;