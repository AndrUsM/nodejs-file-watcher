import handler from '../handlers/handler.js';

const routers = {
    '': handler.index,
    'history': handler.history
}

export default routers;