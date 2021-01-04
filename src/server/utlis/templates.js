const fs = require('fs');
const path = require('path');

const helpers = {};

helpers.getTemplate = async (templatename) => {
    if (!templatename) throw new Error('Invalid template');
    const tempdir = path.join(__dirname, '..', '..', '..', 'src', 'public', 'html');
    const filepath = path.join(tempdir, `${templatename}.html`);
    let page = '';
    try {
        page = await fs.readFileSync(filepath);
    } catch (err) {
        throw new Error('No template');
    }
    return page;
}


helpers.generateTableHead = (tableStr) => {
    const headers = [
        'event',
        'filename',
        'size',
        'type',
        'path',
        'access time',
        'modification time',
        'change time',
        'creation time'
    ];

    headers.forEach(item => {
        tableStr += `<th class='table__head table__field'>${item}</th>`;
    });

    return helpers.wrapHtmlBlock(tableStr, 'tr');
}

helpers.wrapHtmlBlock = (tableStr, tag, className) => {
    className = className ? className : '';
    return [
        `<${tag} class=${className}>`,
        tableStr,
        `</${tag}>`
    ].join('');
}

helpers.generateTableBody = (tableStr, data) => {
    data = data.length > 10 ? data.slice(data.length - 10, data.length) : data;

    data.forEach(item => {
        Object.values(item).forEach(field => {
            tableStr += `<td class='table__data table__field'>${field}</td>`;
        });
        tableStr = helpers.wrapHtmlBlock(tableStr, 'tr', 'table__row');
    });
    return helpers.wrapHtmlBlock(tableStr, 'tr', 'table__row');
}

helpers.generateTable = (data) => {
    let tableStr = '';

    tableStr = helpers.generateTableHead(tableStr);
    tableStr = helpers.generateTableBody(tableStr, data);
    tableStr = helpers.wrapHtmlBlock(tableStr, 'table', 'table');

    return tableStr.trim();
}

helpers.interpolate = (str, data = {}) => {
    Object.entries(data).forEach(([key, value]) => {
        str = str.toString().replace(`{${key}}`, value)
    })
    return str
}

helpers.getStaticAsset = (filename, extension) => {
    if (!filename) throw new Error('A valid static asset name was not specified')
    let assetsDir
    switch (extension) {
        case 'style':
        case 'js':
            assetsDir = path.join(__dirname, '..', '..');
            break;
        case 'plain':
        default:
            break;
    }
    const filepath = path.join(assetsDir, filename)
    let data
    try {
        data = fs.readFileSync(filepath)
    } catch (err) {
        throw new Error('No statis asset was found')
    }
    return data
}

module.exports = helpers;