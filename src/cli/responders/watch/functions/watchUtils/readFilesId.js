const fs = require('fs');
const path = require('path');
const { createFile } = require('../dataUtils/dataUtils');

const {
    previousFilesIdPath,
    currentFilesIdPath
} = require('../../constants');

const readFilesIdType = {
    prev: "prev",
    current: "current"
}

function readFilesId(type) {
    let _path = '';
    switch (type) {
        case readFilesIdType.prev: {
            _path = previousFilesIdPath;
            break;
        }
        case readFilesIdType.current: {
            _path = currentFilesIdPath;
            break;
        }
    }
    if (!path) return [];

    createFile(_path);
    let data = fs.readFileSync(_path)

    if (data) {
        data = data.toString().split('\n');
        return data;
    } else {
        return [];
    }
}

module.exports = {
    readFilesId: readFilesId,
    readFilesIdType: readFilesIdType
}