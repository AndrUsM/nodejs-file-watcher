const http = require('http');
const {
    out,
    messageType
} = require('../lib/coloredOut/out');
const cli = require('../cli/index');
const baseHandler = require('./handlers/baseHandler/baseHandler');

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const server = http.createServer(baseHandler);

function onExit() {
    process.on('exit', function (code) {
        server.close();
        out(
            `The application was closed with code ${code}.`,
            messageType.info
        )
    });
}

function createServer() {
    server.listen(port, hostname, () => {
        out(
            `Server runned on http://${hostname}:${port}`,
            messageType.info
        );
    });
    onExit();
}

function runServer() {
    createServer();
    cli.initialize();
}

module.exports = runServer;