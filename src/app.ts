import { initializeWebScoket } from "./socket";

// Require imports
const io = require('socket.io-client');
const robot = require('robotjs');
const fs = require('fs');
const path = require('path');

initializeWebScoket();