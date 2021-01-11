import templates from '../../utlis/templates.js';
import path from 'path';

const publicHandler = async (data, callback) => {
    if (data.method !== 'get') {
        callback(405, null, 'html')
        return
    }
    try {
        let assetName = path.basename(data.trimmedPath) || data.trimmedPath;

        let contentType, extension;

        switch (true) {
            case assetName.includes('.css'): {
                contentType = 'css'
                extension = 'style'
                break;
            }
            case assetName.includes('.js'):
                contentType = 'js'
                extension = 'js'
                break;
            default:
                contentType = 'plain'
                extension = 'text'
                break;
        }

        const asset = templates.getStaticAsset(assetName, extension);
        callback(200, asset, contentType);
    } catch (err) {
        callback(404, JSON.stringify(err), 'html');
    }
}

export default publicHandler;