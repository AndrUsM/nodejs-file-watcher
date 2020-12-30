const fs = require('fs');

function createFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.openSync(filePath, "r+");
    }
}

function clearFile(filePath) {
    createFile(filePath);
    fs.writeFileSync(filePath, '');
}

function appendFile(filePath, data) {
    createFile(filePath);
    // clearFile(filePath);
    fs.appendFile(filePath, data, { encoding: 'utf8' }, (err) => {
        if (err) console.log(err);
    })
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, { encoding: 'utf8' });
        if (data && data.length) {
            return data.toString();
        } else {
            return '';
        }
    } else {
        return '';
    }
}

module.exports = {
    appendFile: appendFile,
    clearFile: clearFile,
    createFile: createFile,
    readFile: readFile
}