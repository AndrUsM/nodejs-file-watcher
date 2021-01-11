import url from 'url';
import fs from 'fs';
import { StringDecoder } from 'string_decoder';
import handler from '../handler.js';
import router from '../../routes/router.js';
import handleContentType from './handleContentType.js';

export const baseHandler = async (req, res) => {
    try {
        const decoder = new StringDecoder('utf8');
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const trimmedPath = path.replace(/^\/+|\/+$/g, '');
        const method = req.method.toLowerCase();

        let buffer = '';

        req.on('data', data => {
            buffer += decoder.write(data);
        });

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
