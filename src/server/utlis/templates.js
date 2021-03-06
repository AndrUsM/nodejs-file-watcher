import fs from 'fs';
import path from 'path';

const templates = {};

templates.getTemplate = async (templatename) => {
    if (!templatename) throw new Error('Invalid template');

    const tempdir = path.join('src', 'public', 'html');
    const filepath = path.join(tempdir, `${templatename}.html`);

    let page = '';

    try {
        page = await fs.readFileSync(filepath);
    } catch (err) {
        throw new Error('No template');
    }

    return page;
}

templates.interpolate = (str, data = {}) => {
    Object.entries(data).forEach(([key, value]) => {
        str = str.toString().replace(`{${key}}`, value)
    })
    return str
}

templates.getStaticAsset = (filename, extension) => {
    if (!filename) throw new Error('A valid static asset name was not specified');

    let assetsDir = '';
    const publicFolder = path.join('src', 'public');

    switch (extension) {
        case 'style': {
            assetsDir = path.join(publicFolder, 'css');
            break;
        }
        case 'js': {
            assetsDir = path.join(publicFolder, 'js');
            break;
        }
        case 'plain':
        default:
            break;
    }

    const filepath = path.join(assetsDir, filename)
    let data = '';

    try {
        data = fs.readFileSync(filepath)
    } catch (err) {
        throw new Error('No statis asset was found')
    }

    return data
}

export default templates;