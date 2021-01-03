const fs = require('fs');
const {
    appendFile,
    createFile
} = require('../dataUtils/dataUtils');
const { applicationHistoryPath } = require('../../constants');
const generateHistoryReport = require('./generateHistoryReport');

const specialSign = require('./constants');
const distinctHistoryData = require('./distinctHistoryData');
const dataObjectExpectedLength = 9;

function saveToHistory(fileData) {
    let {
        filePath,
        event,
        savedFileData
    } = fileData;

    const isFileExist = fs.existsSync(filePath);

    if (!fs.existsSync(applicationHistoryPath))
        createFile(applicationHistoryPath);

    let data = generateHistoryReport(filePath, event, {
        deleted: !isFileExist,
        savedFileData: savedFileData
    });
    data = data && typeof data !== 'string' ? JSON.stringify(data) : data;

    const dataLength = Object.values(JSON.parse(data)).length;
    const checkDataLength = dataLength === dataObjectExpectedLength;

    if (checkDataLength) {
        const addSpecialSign = () => {
            return [
                data,
                specialSign
            ].join('');
        }
        try {
            const appendAction = appendFile(applicationHistoryPath, addSpecialSign());
            if (!savedFileData && Object.values(savedFileData).length) {
                appendAction;
            } else {
                appendFile(applicationHistoryPath, addSpecialSign());
            }
        } catch (error) {
            console.log(error);
        }
    }
    distinctHistoryData();
}

module.exports = saveToHistory;