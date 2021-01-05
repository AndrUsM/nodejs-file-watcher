const http = require('http');
const {
    out,
    messageType
} = require('../lib/coloredOut/out');
const cli = require('../cli/index');
const baseHandler = require('./handlers/baseHandler/baseHandler');

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

function createServer() {
    http.createServer(baseHandler)
        .listen(port, hostname, () => {
            out(
                `Server runned on http://${hostname}:${port}`,
                messageType.info
            );
        })
}

function runServer() {
    createServer();
    cli.initialize();
}

module.exports = runServer;