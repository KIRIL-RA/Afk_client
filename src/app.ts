import { initializeWebScoket } from "./socket";

// Require imports
const io = require('socket.io-client');
const robot = require('robotjs');
const fs = require('fs');
const path = require('path');

// Loading config
const config = JSON.parse(fs.readFileSync(path.join(path.dirname(process.execPath), 'config.json')));

initializeWebScoket();