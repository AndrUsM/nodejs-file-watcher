// const http = require('http');
// const {
//     out,
//     messageType
// } = require('../lib/coloredOut/out');
// const cli = require('../cli/index');
// const baseHandler = require('./handlers/baseHandler/baseHandler');

import http from 'http';
import { out } from '../lib/coloredOut/out.js';
import { messageType } from '../lib/coloredOut/messageType.js';
import cli from '../cli/index.js';
import { baseHandler } from './handlers/baseHandler/baseHandler.js';

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const server = http.createServer(baseHandler);

function onExit() {
    process.on('exit', function (code) {
        server.close();
        cli.clearConfigData();
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

export function runServer() {
    createServer();
    cli.initialize();
}