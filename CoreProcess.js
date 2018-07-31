/*
 * WIP: the mcs-core lib will be turned into a dependecy sometime in the near
 * future, and it will probably act with a separate process that answers via
 * its own redis channel
 */

'use strict';
const Logger = require('../utils/Logger');
const MCSApiStub = require('./lib/media/MCSApiStub');
const API = require('mcs-js');
const http = require('http');
const config = require('config');

let controller = new MCSApiStub();

Logger.info('[app] MCS Server is initializing ...');

// HTTPS server
let port = config.get('mcs-port');
let serverHttps = http.createServer().listen(port, () => {
  Logger.info('[app] MCS Server is ready to receive connections');
});

let mcsServer = new API.Server({
  path: config.get('mcs-path'),
  server: serverHttps,
  connectionTimeout: 1000
});

mcsServer.on('connection', (client) => {
  Logger.info('[app] Client connected');
  controller.setupClient(client);
});

let exit = () => {
  process.exit();
}

process.on('SIGINT', () => {
  exit();
});

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

process.on('unhandledrejection', (e1, e2) => {
  Logger.error(e1,e2);
});

