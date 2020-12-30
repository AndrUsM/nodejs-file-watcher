const fs = require('fs');
const {
    readFile
} = require('../dataUtils/dataUtils');
const { applicationHistoryPath } = require('../../constants');
const SPECIAL_SIGN = require('./constants');

function getHistory() {
    if (fs.existsSync(applicationHistoryPath)) {
        const data = readFile(applicationHistoryPath);
        if (data && data.length) {
            return data
                .slice(0, -1)
                .trim()
                .split(SPECIAL_SIGN).
                map(item => item ? JSON.parse(item) : {})
        } else {
            return [];
        }
    } else {
        return [];
    }
}

module.exports = getHistory;