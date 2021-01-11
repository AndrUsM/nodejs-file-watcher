import { statSync } from 'fs';

export function generateFileId(filePath, options) {
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

    const checkWhitespacesOption = typeof whitespaces === 'boolean' && whitespaces;
    if (checkWhitespacesOption) {
        return `${id} `;
    }

    return id;
}