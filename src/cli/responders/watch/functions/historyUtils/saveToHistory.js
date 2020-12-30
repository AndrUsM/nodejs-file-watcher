const fs = require('fs');
const {
    appendFile,
    createFile
} = require('../dataUtils/dataUtils');
const { applicationHistoryPath } = require('../../constants');
const generateHistoryReport = require('./generateHistoryReport');

const SPECIAL_SIGN = require('./constants');

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
    
    if (Object.values(JSON.parse(data)).length === 10) {
        const addSpecialSign = () => {
            return [
                data,
                SPECIAL_SIGN
            ].join('');
        }

        try {
            appendFile(applicationHistoryPath, addSpecialSign());
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = saveToHistory;