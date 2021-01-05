const http = require('http');
const cli = require('../cli/index');
const baseHandler = require('./handlers/baseHandler/baseHandler');

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

function createServer() {
    http.createServer(baseHandler)
        .listen(port, hostname, () => {
            console.log(`Server runned on http://${hostname}:${port}`);
        })
}

function runServer() {
    createServer();
    cli.initialize();
}

module.exports = runServer;