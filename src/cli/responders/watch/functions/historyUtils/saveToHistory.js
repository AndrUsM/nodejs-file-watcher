const fs = require('fs');
const {
    appendFile,
    createFile
} = require('../dataUtils/dataUtils');
const { applicationHistoryPath } = require('../../constants');

const specialSign = require('./constants');
const dataObjectExpectedLength = 9;

function saveToHistory(parameters) {
    let {
        fileData
    } = parameters;

    if (!fs.existsSync(applicationHistoryPath))
        createFile(applicationHistoryPath);

    const checkInsideFileData = Object.values(fileData).length === dataObjectExpectedLength
    if (checkInsideFileData) {
        appendFile(applicationHistoryPath, addSpecialSign(fileData));
    }
}

const addSpecialSign = (data) => {
    data = typeof data !== 'string' ? JSON.stringify(data) : data;
    return [
        data,
        specialSign
    ].join('');
}

module.exports = saveToHistory;