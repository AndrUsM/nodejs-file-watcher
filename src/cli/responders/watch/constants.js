const path = require('path');

const baseDataPath = path.join(__dirname, 'data');
const currentFilesIdPath = path.resolve(baseDataPath, '.currentFilesID.dat');
const previousFilesIdPath = path.resolve(baseDataPath, '.previousFilesID.dat');

const applicationHistoryPath = path.resolve(baseDataPath, '.history.dat');

module.exports = {
    currentFilesIdPath: currentFilesIdPath,
    previousFilesIdPath: previousFilesIdPath,
    applicationHistoryPath: applicationHistoryPath
}