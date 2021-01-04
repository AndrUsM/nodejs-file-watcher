const notFoundHandler = require('./partials/notFound');
const indexPageHandler = require('./partials/index');
const publicHandler = require('./partials/public');

const handler = {};

handler.notFound = notFoundHandler;
handler.index = indexPageHandler;
handler.public = publicHandler;

module.exports = handler;