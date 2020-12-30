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

helpers.generateTable = (data) => {
    let resoult = '';

    resoult += '<table>';

    [
        'event',
        'filename',
        'size',
        'type',
        'path',
        'fileId',
        'access time',
        'modification time',
        'change time',
        'creation time'
    ].forEach(_title => {
        resoult += `<th>${_title}</th>`
    })

    data.forEach(item => {
        resoult += '<tr>';
        Object.values(item).forEach(field => {
            // console.log(field);
            resoult += `<td>${field}</td>`;
        });
        resoult += '</tr>';
    });

    resoult += '</table>';
    return resoult;
}

helpers.interpolate = (str, data = {}) => {
    // Object.entries(config.globalTokens).forEach(([key, value]) => {
    //     data[`global.${key}`] = value
    // })
    Object.entries(data).forEach(([key, value]) => {
        str = str.toString().replace(`{${key}}`, value)
    })
    return str
}

module.exports = helpers;