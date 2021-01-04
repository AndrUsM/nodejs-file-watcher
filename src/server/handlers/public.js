const helpers = require('../utlis/templates');

const publicHandler = async (data, callback) => {
    if (data.method !== 'get') {
        callback(405, null, 'html')
        return
    }
    try {
        let asset_name = data.trimmedPath.replace('public/images/', ''.trim())
        let content_type, extension
        switch (true) {
            case asset_name.includes('.css'): {
                content_type = 'css'
                extension = 'style'
                break;
            }
            case asset_name.includes('.js'):
                content_type = 'js'
                extension = 'js'
                break;
            default:
                content_type = 'plain'
                extension = 'text'
                break;
        }
        let asset = await helpers.getStaticAsset(asset_name, extension)
        callback(200, asset, content_type)
    } catch (err) {
        callback(404, null, 'html')
    }
}

module.exports = publicHandler;