const url = require('url');
const { StringDecoder } = require('string_decoder');
const handler = require('../handler');
const router = require('../../routes/router');
const handleContentType = require('./handleContentType');

const baseHandler = async (req, res) => {
    try {
        let decoder = new StringDecoder('utf8');
        let parsedUrl = url.parse(req.url, true);
        let path = parsedUrl.pathname;
        let trimmedPath = path.replace(/^\/+|\/+$/g, '');
        let method = req.method.toLowerCase();

        let buffer = '';

        req.on('data', data => {
            buffer += decoder.write(data);
        })

        req.on('end', () => {
            buffer += decoder.end();

            let reqHandler = router[trimmedPath] || handler.notFound;

            const isUsedPublicHandler =
                trimmedPath.includes('public/css') ||
                trimmedPath.includes('public/js');

            if (isUsedPublicHandler) {
                reqHandler = handler.public
            }

            let data = {
                trimmedPath,
                query: parsedUrl.query,
                method,
                headers: req.headers,
                payload: buffer
            };

            // data, callback
            reqHandler(data, (statusCode = 200, payload, contentType = 'json') => {
                handleContentType({
                    contentType: contentType,
                    payload: payload,
                    response: res
                });
                
                res.writeHead(statusCode);
                res.end(payload);
            })
        })
    }
    catch (error) {
        res.setHeader('Content-Type', 'text/plain')
        res.writeHead(500);
        res.end(error);
    }
}



module.exports = baseHandler;