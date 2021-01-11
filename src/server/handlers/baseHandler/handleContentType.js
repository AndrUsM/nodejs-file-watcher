function handleContentType(parameters) {
    let {
        payload,
        response,
    } = parameters;
    
    const {
        contentType
    } = parameters;

    let headerValue = '';

    switch (contentType) {
        case 'json': {
            payload = JSON.stringify(payload);
            headerValue = 'application/json';
            break;
        }
        case 'html': {
            headerValue = 'text/html';
            break;
        }
        case 'favicon':
            headerValue = 'image/x-icon';
            break;
        case 'css': {
            headerValue = 'text/css';
            break;
        }
        case 'js': {
            headerValue = 'text/javascript';
            break;
        }
        case 'png': {
            headerValue = 'image/png';
            break;
        }
        case 'jpg': {
            headerValue = 'image/jpeg';
            break;
        }
        case 'plain':
        default: {
            headerValue = 'text/plain';
            break;
        }
    }
    response.setHeader('Content-Type', headerValue);
}

export default handleContentType;