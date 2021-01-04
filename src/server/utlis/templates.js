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