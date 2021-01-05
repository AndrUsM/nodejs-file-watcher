const fs = require('fs');
const { 
    out, 
    messageType 
} = require('../../../../../lib/coloredOut/out');

function createFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
            filePath,
            '',
            { encoding: 'utf8' }
        );
    }
}

function writeFile(filePath, data) {
    createFile(filePath);
    fs.writeFile(filePath, data, (error) => {
        if (error)
            out(
                `Error writing ${data} to ${filePath}.`,
                messageType.error
            );
        return true;
    })
}

function clearFile(filePath) {
    createFile(filePath);
    fs.writeFileSync(filePath, '');
}

function appendFile(filePath, data) {
    createFile(filePath);
    fs.appendFile(filePath, data, { encoding: 'utf8' }, (err) => {
        if (err)
            out(
                err.message,
                messageType.error
            );
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
    readFile: readFile,
    writeFile: writeFile
}