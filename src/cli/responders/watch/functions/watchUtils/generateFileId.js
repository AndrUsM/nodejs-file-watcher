const { statSync } = require('fs');

function generateFileId(filePath, options) {
    let whitespaces = false;
    if (options) {
        whitespaces = options.whitespaces ? options.whitespaces : false;
    }

    const {
        ino,
        dev
    } = statSync(filePath);

    const id = [
        dev,
        ino
    ].join('-');

    if (typeof whitespaces === 'boolean' && whitespaces) return `${id} `;
    return id;
}

module.exports = generateFileId;