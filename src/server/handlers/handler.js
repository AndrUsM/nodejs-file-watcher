const notFoundHandler = require('./notFound');
const indexPageHandler = require('./index');
const publicHandler = require('./public');

const handler = {};

handler.notFound = notFoundHandler;
handler.index = indexPageHandler;
handler.public = publicHandler;

module.exports = handler;