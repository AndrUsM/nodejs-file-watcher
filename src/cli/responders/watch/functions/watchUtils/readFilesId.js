const fs = require('fs');
const path = require('path');
const { createFile } = require('../dataUtils/dataUtils');

const {
    previousFilesIdPath,
    currentFilesIdPath
} = require('../../constants');

// type:string = prev | current
function readFilesId(type) {
    let _path = '';
    switch (type) {
        case 'prev': {
            _path = previousFilesIdPath;
            break;
        }
        case 'current': {
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

module.exports = readFilesId;